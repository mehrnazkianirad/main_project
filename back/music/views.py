from rest_framework import viewsets, filters, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import *
from .serializers import *
from .spotify_service import get_spotify_token
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models
from django.contrib.gis.geoip2 import GeoIP2
from django.conf import settings
import requests
import os
import pandas as pd


class LocationMusicView(APIView):
    permission_classes = [IsAuthenticated]

    def get_client_ip(self, request):
        """
        Returns the client's IP address.
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def get_location_by_ip(self, ip):
        """
        Returns the country based on the client's IP address.
        """
        try:
            g = GeoIP2()
            country = g.country(ip)['country_name']
            return country
        except Exception:
            if settings.DEBUG:
                return "TestCountry"
            return "Unknown"

    def get_song_from_excel(self, country):
        """
        Returns the song name based on the country from the Excel file.
        """
        try:
            excel_path = settings.EXCEL_FILE_PATH  # Path to the Excel file
            df = pd.read_excel(excel_path)

            # Expecting columns: 'country' and 'song'
            matched_row = df[df['country'].str.lower() == country.lower()]
            if not matched_row.empty:
                return matched_row.iloc[0]['song']
            else:
                return f"default song for {country}"
        except Exception as e:
            return None

    def get_spotify_token(self):
        """
        Retrieves the Spotify API token.
        """
        client_id = settings.SPOTIFY_CLIENT_ID
        client_secret = settings.SPOTIFY_CLIENT_SECRET
        auth_url = 'https://accounts.spotify.com/api/token'

        data = {'grant_type': 'client_credentials'}
        response = requests.post(auth_url, data=data, auth=(client_id, client_secret))
        if response.status_code == 200:
            return response.json().get('access_token')
        return None

    def fetch_spotify(self, song_name):
        """
        Fetches song details from Spotify based on the song name.
        """
        try:
            token = self.get_spotify_token()
            if not token:
                raise Exception("No token retrieved")

            search_url = "https://api.spotify.com/v1/search"
            headers = {'Authorization': f'Bearer {token}'}
            params = {
                'q': song_name,
                'type': 'track',
                'limit': 3
            }

            response = requests.get(search_url, headers=headers, params=params)
            if response.status_code != 200:
                raise Exception(f"Spotify API error: {response.json()}")

            data = response.json()['tracks']['items']
            return [
                {
                    'title': item['name'],
                    'artist': item['artists'][0]['name'],
                    'url': item['external_urls']['spotify']
                } for item in data
            ]
        except Exception as e:
            return {"error": str(e)}

    def get(self, request, *args, **kwargs):
        """
        Handles the GET request, retrieves the country based on IP, fetches the song,
        and returns the song details from Spotify.
        """
        ip = self.get_client_ip(request)
        country = self.get_location_by_ip(ip)

        song_name = self.get_song_from_excel(country)
        if not song_name:
            return Response({"error": "Could not fetch song from Excel."}, status=500)

        spotify_results = self.fetch_spotify(song_name)

        return Response({
            "ip": ip,
            "country": country,
            "song_name": song_name,
            "spotify": spotify_results,
        })


class SpotifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        token, error_status = get_spotify_token()
        if token:
            return Response({'token': token})
        if error_status == 401:
            return Response({'error': 'Unauthorized: Invalid client credentials'}, status=401)
        if error_status == 503:
            return Response({'error': 'Spotify service unavailable'}, status=503)
        return Response({'error': 'Failed to get token'}, status=500)


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsPremiumUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'is_premium', False)


class MusicViewSet(viewsets.ModelViewSet):
    serializer_class = MusicSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'artist', 'genre']
    ordering_fields = ['release_date', 'duration']

    def get_queryset(self):
        queryset = Music.objects.filter(is_active=True)
        if self.request.user.is_authenticated and not getattr(self.request.user, 'is_premium', False):
            return queryset[:3]
        return queryset

    @action(detail=False, methods=['get'])
    def popular(self, request):
        popular_ids = PlayHistory.objects.values('music').annotate(
            count=models.Count('music')).order_by('-count')[:10]
        ids = [item['music'] for item in popular_ids]
        queryset = Music.objects.filter(id__in=ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
    permission_classes = [IsAuthenticated]


class UserMoodViewSet(viewsets.ModelViewSet):
    queryset = UserMood.objects.all()
    serializer_class = UserMoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserMood.objects.filter(user=self.request.user)


class UserLocationViewSet(viewsets.ModelViewSet):
    queryset = UserLocation.objects.all()
    serializer_class = UserLocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserLocation.objects.filter(user=self.request.user)


class ExternalAPIViewSet(viewsets.ModelViewSet):
    queryset = ExternalAPI.objects.all()
    serializer_class = ExternalAPISerializer
    permission_classes = [IsAuthenticated]


class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PlayHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = PlayHistorySerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return PlayHistory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
