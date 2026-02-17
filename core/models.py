from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = "Categories"
        
    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    git_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    categories = models.ManyToManyField(Category)
    date_created = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Skill(models.Model):
    CATEGORY_CHOICES = (
        ('Language', 'Language'),
        ('Framework', 'Framework'),
        ('AI/ML', 'AI/ML'),
        ('Web', 'Web'),
        ('Tool', 'Tool'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(help_text="Proficiency in percentage (0-100)")
    
    def __str__(self):
        return f"{self.name} ({self.category})"

class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, default='Karachi, Pakistan')
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True, help_text="Leave blank if currently working here")
    is_current = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title} at {self.company}"

class Education(models.Model):
    degree = models.CharField(max_length=200)
    school = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_year = models.CharField(max_length=4)
    end_year = models.CharField(max_length=10, help_text="e.g. 2027 or 'Present'")
    
    def __str__(self):
        return f"{self.degree} from {self.school}"

class Certification(models.Model):
    title = models.CharField(max_length=200)
    issued_by = models.CharField(max_length=200)
    link = models.URLField(blank=True, null=True)
    date_issued = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
