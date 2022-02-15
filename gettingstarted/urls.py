from django.urls import path, include

from django.contrib import admin

admin.autodiscover()

import datepicker.views

# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path("", datepicker.views.home, name="home"),
    path("home/", datepicker.views.home, name="home"),
    path("first_prototype/", datepicker.views.firstPrototype, name="first_prototype"),
    path("second_prototype/", datepicker.views.secondPrototype, name="second_prototype"),
    path("participation/", datepicker.views.participation, name="participation"),
    path("db/", datepicker.views.db, name="db"),
    path("admin/", admin.site.urls),
]
