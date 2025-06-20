from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from .models import Product

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status


###################### USERS ##########################

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():  # add info to token return view (login)
            data[k] = v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username= data['email'], # set the username to email
            email=data['email'],
            password= make_password(data['password']),# encode
        )
    
        serializer = UserSerializerWithToken(user, many = False)
        return Response(serializer.data)
    except:
        message = {'detail': 'user with email already exist'
                   }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])  # gets dta from token bc of this decorator
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])  # gets dta from token bc of this decorator
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user= request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':#  no reset pword
        user.password = make_password(data['password']) # hash it

    user.save() 
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


###################### PRODUCTS ##########################

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
