from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting, UserTaskData

from datetime import datetime

import json

# Create your views here.


def index(request):
    return render(request, "index.html")


def home(request):
    return render(request, "home.html")


def participation(request):
    return render(request, "participation.html")

def firstPrototype(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        for data in body:
            print(data)
            userTaskData = UserTaskData()
            
            userTaskData.userID = data.get('userID', None)
            userTaskData.taskID = data.get('taskID', None)
            userTaskData.userAnswer = data.get('userAnswer', None)
            userTaskData.taskCorrectAnswered = data.get('taskCorrectAnswered', None)
            userTaskData.prototype = data.get('prototype', None)
            userTaskData.answerDate = data.get('answerDate', None)
            userTaskData.overallMouseClicksCounter = data.get('overallMouseClicksCounter', None)
            userTaskData.clickOnCalendarCounter = data.get('clickOnCalendarCounter', None)
            userTaskData.clickOnDaysCounter = data.get('clickOnDaysCounter', None)
            userTaskData.timeNeededForTask = data.get('timeNeededForTask', None)

            userTaskData.save()


        message = f"update successful: {body[0]}"
        return HttpResponse(message)
    else:
        return render(request, "first_prototype.html")

def secondPrototype(request):
    return render(request, "second_prototype.html")


def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})
