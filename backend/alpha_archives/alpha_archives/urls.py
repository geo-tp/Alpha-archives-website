from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import path, include
import element.views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'images', element.views.ImageViewSet)
router.register(r'image-hash', element.views.HashImageViewSet)
router.register(r'hash', element.views.HashViewSet)
router.register(r'elements', element.views.ElementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)