from rest_framework import serializers
from .models import (
    Music, Recommendation, UserMood, UserLocation,
    ExternalAPI, Playlist, Favorite, PlayHistory
)
from accounts.models import User


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = '__all__'


class RecommendationSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)
    music = MusicSerializer(read_only=True)

    class Meta:
        model = Recommendation
        fields = '__all__'


class UserMoodSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = UserMood
        fields = '__all__'


class UserLocationSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = UserLocation
        fields = '__all__'


class ExternalAPISerializer(serializers.ModelSerializer):
    music = MusicSerializer(read_only=True)

    class Meta:
        model = ExternalAPI
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)
    musics = MusicSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'user', 'name', 'description', 'musics', 'created_at']


class FavoriteSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)
    music = MusicSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = '__all__'


class PlayHistorySerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)
    music = MusicSerializer(read_only=True)

    class Meta:
        model = PlayHistory
        fields = '__all__'
