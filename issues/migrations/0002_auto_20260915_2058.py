from django.db import migrations
from django.contrib.auth.hashers import make_password


def create_default_users(apps, schema_editor):
    User = apps.get_model('auth', 'User')

    # Create admin user
    if not User.objects.filter(username='admin').exists():
        User.objects.create(
            username='admin',
            password=make_password('admin@123'),
            is_staff=True,
            is_superuser=True,
            is_active=True
        )

    # Create student user
    if not User.objects.filter(username='student1').exists():
        User.objects.create(
            username='student1',
            password=make_password('student123'),
            is_staff=False,
            is_superuser=False,
            is_active=True
        )


class Migration(migrations.Migration):

    dependencies = [
        ('issues', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_users),
    ]