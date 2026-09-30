from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # User.objects.create = saves the password as plain text
        # User.objects.create_user = Automically hashes the password    
        user = User.objects.create_user(**validated_data)
        return user
