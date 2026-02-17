import requests
from django.shortcuts import render, redirect
from .models import Project, Skill, Experience, Education, Certification, ContactMessage
from django.contrib import messages
from django.core.cache import cache

def home(request):
    # Fetch local projects from DB
    projects = Project.objects.all().order_by('-date_created')
    
    # Fetch GitHub Repos
    github_repos = cache.get('github_repos')
    if not github_repos:
        try:
            # We fetch 12 to have some variety, we'll display 10
            response = requests.get('https://api.github.com/users/muhammad-hassn/repos?sort=updated&per_page=12')
            if response.status_code == 200:
                github_repos = response.json()
                # Cache for 1 hour to avoid rate limits
                cache.set('github_repos', github_repos, 3600)
            else:
                github_repos = []
        except Exception as e:
            print(f"Error fetching GitHub repos: {e}")
            github_repos = []

    skills = Skill.objects.all()
    experiences = Experience.objects.all().order_by('-start_date')
    educations = Education.objects.all().order_by('-start_year')
    certifications = Certification.objects.all().order_by('-date_issued')
    
    # Group skills by category for better display
    skills_by_category = {}
    for skill in skills:
        if skill.category not in skills_by_category:
            skills_by_category[skill.category] = []
        skills_by_category[skill.category].append(skill)
    
    context = {
        'projects': projects,
        'github_repos': github_repos[:10],
        'skills_by_category': skills_by_category,
        'experiences': experiences,
        'educations': educations,
        'certifications': certifications,
    }
    
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        messages.success(request, "Your message has been sent successfully! I'll get back to you soon.")
        return redirect('home')
        
    return render(request, 'index.html', context)
