from rest_framework import serializers

from .models import TransportIssue


class TransportIssueSerializer(serializers.ModelSerializer):

    class Meta:

        model = TransportIssue

        fields = '__all__'

    def validate_bus_number(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Bus number is required."
            )

        if len(value) > 20:
            raise serializers.ValidationError(
                "Bus number cannot exceed 20 characters."
            )

        return value

    def validate_route(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Route is required."
            )

        if len(value) < 2:
            raise serializers.ValidationError(
                "Route must contain at least 2 characters."
            )

        if len(value) > 100:
            raise serializers.ValidationError(
                "Route cannot exceed 100 characters."
            )

        return value

    def validate_issue_type(self, value):

        valid_types = [
            choice[0]
            for choice in TransportIssue.ISSUE_TYPES
        ]

        if value not in valid_types:
            raise serializers.ValidationError(
                "Invalid issue type."
            )

        return value

    def validate_description(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Description is required."
            )

        if len(value) < 10:
            raise serializers.ValidationError(
                "Description must contain at least 10 characters."
            )

        if len(value) > 500:
            raise serializers.ValidationError(
                "Description cannot exceed 500 characters."
            )

        return value

    def validate_priority(self, value):

        valid_priorities = [
            choice[0]
            for choice in TransportIssue.PRIORITY_CHOICES
        ]

        if value not in valid_priorities:
            raise serializers.ValidationError(
                "Invalid priority."
            )

        return value

    def validate_status(self, value):

        valid_statuses = [
            choice[0]
            for choice in TransportIssue.STATUS_CHOICES
        ]

        if value not in valid_statuses:
            raise serializers.ValidationError(
                "Invalid status."
            )

        return value