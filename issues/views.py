from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .models import TransportIssue
from .serializers import TransportIssueSerializer


# ==========================================
# TRANSPORT ISSUE CRUD API
# ==========================================

class TransportIssueViewSet(viewsets.ModelViewSet):

    queryset = TransportIssue.objects.all().order_by('-created_at')
    serializer_class = TransportIssueSerializer


# ==========================================
# LOGIN API
# ==========================================

@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    # Check username and password
    user = authenticate(
        username=username,
        password=password
    )

    # Login successful
    if user is not None:

        # Identify the actual role of the account
        if user.is_superuser:
            role = "admin"

        elif user.is_staff:
            role = "staff"

        else:
            role = "student"

        return Response({
            "success": True,
            "message": "Login successful",
            "username": user.username,
            "role": role
        })

    # Login failed
    return Response({
        "success": False,
        "message": "Invalid username or password"
    }, status=status.HTTP_401_UNAUTHORIZED)