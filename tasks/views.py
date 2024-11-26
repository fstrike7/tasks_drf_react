from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from .serializer import TaskSerializer
from .models import Task
import uuid

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user_id = self.request.headers.get('X-UserID')

        if not user_id:
            raise PermissionDenied("Missing 'X-UserID' header")

        try:
            uuid.UUID(user_id)
        except ValueError:
            raise PermissionDenied("Invalid 'X-UserID' header format")

        return Task.objects.filter(user_id=user_id)
    
    def perform_create(self, serializer):
        user_id = self.request.headers.get('X-UserID')
        if not user_id:
            raise PermissionDenied("Missing 'X-UserID' header")
        try:
            uuid.UUID(user_id)
        except ValueError:
            raise PermissionDenied("Invalid 'X-UserID' header format")

        serializer.save(user_id=user_id)

    def update(self, request, *args, **kwargs):
        user_id = request.headers.get('X-UserID')
        if not user_id:
            raise PermissionDenied("Missing 'X-UserID' header")

        instance = self.get_object()
        if str(instance.user_id) != user_id:
            raise PermissionDenied("You do not have permission to update this task.")

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        user_id = request.headers.get('X-UserID')
        if not user_id:
            raise PermissionDenied("Missing 'X-UserID' header")

        instance = self.get_object()
        if str(instance.user_id) != user_id:
            raise PermissionDenied("You do not have permission to delete this task.")

        return super().destroy(request, *args, **kwargs)