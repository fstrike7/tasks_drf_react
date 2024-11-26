from django.urls import path, include
from rest_framework import routers
from tasks import views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

# Versionado de API
router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'tasks')
urlpatterns = [
    # GET, POST, PUT, DELETE
    path("api/v1/", include(router.urls)),
    # Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]