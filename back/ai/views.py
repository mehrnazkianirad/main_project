# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from .recommenders import recommend_by_context, recommend_by_knn
# from music.serializers import MusicSerializer


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def recommend_music_view(request):
#     user = request.user

#     musics = recommend_by_knn(user)
#     if musics is None or not musics.exists():
#         musics = recommend_by_context(user)

#     data = MusicSerializer(musics, many=True).data
#     return Response(data)
