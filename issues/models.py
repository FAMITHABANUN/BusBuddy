from django.db import models


class TransportIssue(models.Model):

    ISSUE_TYPES = [
        ('Bus Delay', 'Bus Delay'),
        ('Overcrowding', 'Overcrowding'),
        ('Damaged Seat', 'Damaged Seat'),
        ('Route Problem', 'Route Problem'),
        ('Maintenance', 'Maintenance'),
        ('Other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('Reported', 'Reported'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
    ]

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    bus_number = models.CharField(max_length=20)
    route = models.CharField(max_length=100)
    issue_type = models.CharField(max_length=50, choices=ISSUE_TYPES)
    description = models.TextField()
    reported_by = models.CharField(max_length=100)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Reported'
    )
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='Medium'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bus_number} - {self.issue_type}"