from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TransportIssueViewSet, login_user


router = DefaultRouter()

router.register(
    r'issues',
    TransportIssueViewSet,
    basename='transport-issue'
)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_user, name='login'),
]