from django.contrib import admin

from .models import TransportIssue


@admin.register(TransportIssue)
class TransportIssueAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'bus_number',
        'route',
        'issue_type',
        'reported_by',
        'status',
        'priority',
        'created_at',
    )

    list_filter = (
        'status',
        'priority',
        'issue_type',
    )

    search_fields = (
        'bus_number',
        'route',
        'reported_by',
        'description',
    )

    ordering = (
        '-created_at',
    )