from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField("date created", auto_now_add=True)

class UserTaskData(models.Model):
    userID = models.CharField(max_length=42)
    taskID = models.IntegerField()
    userAnswer = models.CharField(max_length=42)
    taskCorrectAnswered = models.BooleanField()
    prototype = models.IntegerField()
    answerDate = models.CharField(max_length=42)
    overallMouseClicksCounter = models.IntegerField()
    clickOnCalendarCounter = models.IntegerField()
    clickOnDaysCounter = models.IntegerField()
    timeNeededForTask = models.FloatField()