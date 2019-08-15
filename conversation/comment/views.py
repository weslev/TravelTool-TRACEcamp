from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from comment.models import Comment
from comment.serializers import CommentSerializer

# Create your views here.


@csrf_exempt
def comments_view(request):
    if request.method == 'GET':
        countryId = request.GET.get('countryId')
        comments = Comment.objects.filter(country=countryId)
        serializer = CommentSerializer(comments, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
