from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LocationMusicView,
    MusicViewSet, RecommendationViewSet, UserMoodViewSet,
    UserLocationViewSet, ExternalAPIViewSet, PlaylistViewSet,
    FavoriteViewSet, PlayHistoryViewSet, SpotifyTokenView
)

router = DefaultRouter()
router.register(r'music', MusicViewSet, basename='music')
router.register(r'recommendations', RecommendationViewSet)
router.register(r'user-mood', UserMoodViewSet)
router.register(r'user-location', UserLocationViewSet)
router.register(r'external-apis', ExternalAPIViewSet)
router.register(r'playlists', PlaylistViewSet, basename='playlists')
router.register(r'favorites', FavoriteViewSet, basename='favorites')
router.register(r'play-history', PlayHistoryViewSet, basename='play-history')

urlpatterns = [
    path('', include(router.urls)),
    # path('api/youtube-search/', YouTubeSearchView.as_view(), name='youtube-search'),
    path('api/location-music/', LocationMusicView.as_view(), name='location-music'),
    path('api/spotify-token/', SpotifyTokenView.as_view(), name='spotify-token'),
]
