from music.models import Music, PlayHistory, UserMood, UserLocation
from sklearn.neighbors import NearestNeighbors
import numpy as np
from .utils import get_weather_by_location, get_country_from_coords


def recommend_by_context(user):
    try:
        mood = UserMood.objects.filter(user=user).latest('timestamp').mood
    except UserMood.DoesNotExist:
        mood = None

    try:
        location = UserLocation.objects.filter(user=user).latest('timestamp')
        weather = get_weather_by_location(location)
        country = get_country_from_coords(location.latitude, location.longitude)
    except UserLocation.DoesNotExist:
        weather = None
        country = None

    if mood == "sad" and weather == "rainy":
        return Music.objects.filter(genre__icontains="lo-fi")[:10]
    elif country == "Japan":
        return Music.objects.filter(artist__icontains="Yiruma")[:10]

    return Music.objects.order_by('?')[:10]


def recommend_by_knn(user):
    history = PlayHistory.objects.filter(user=user).select_related('music')

    if not history.exists():
        return None

    vectors = []
    music_ids = []

    for item in history:
        m = item.music
        vector = [
            hash(m.genre or '') % 100,
            m.duration or 180,
            hash(m.artist or '') % 100,
        ]
        vectors.append(vector)
        music_ids.append(m.id)

    knn = NearestNeighbors(n_neighbors=min(5, len(vectors)))
    knn.fit(vectors)

    last_vector = vectors[-1]
    _, indices = knn.kneighbors([last_vector])

    similar_ids = [music_ids[i] for i in indices[0]]
    return Music.objects.filter(id__in=similar_ids)
