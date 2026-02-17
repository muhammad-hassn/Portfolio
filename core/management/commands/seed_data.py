import os
from django.core.management.base import BaseCommand
from core.models import Category, Project, Skill, Experience, Education, Certification
from datetime import date

class Command(BaseCommand):
    help = 'Seed the database with initial portfolio data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Categories
        cat_ai, _ = Category.objects.get_or_create(name='AI/ML')
        cat_web, _ = Category.objects.get_or_create(name='Web Development')
        cat_ds, _ = Category.objects.get_or_create(name='Data Science')
        
        # Skills
        skills_data = [
            ('Python', 'Language', 90),
            ('TypeScript', 'Language', 80),
            ('C#', 'Language', 75),
            ('SQL', 'Language', 85),
            ('Django', 'Framework', 90),
            ('Flask', 'Framework', 75),
            ('FastAPI', 'Framework', 70),
            ('Next.js', 'Framework', 85),
            ('Machine Learning', 'AI/ML', 85),
            ('Deep Learning', 'AI/ML', 80),
            ('Keras', 'AI/ML', 75),
            ('PyTorch', 'AI/ML', 70),
            ('TensorFlow', 'AI/ML', 70),
            ('Tailwind CSS', 'Web', 90),
            ('Bootstrap', 'Web', 85),
            ('Git/GitHub', 'Tool', 90),
        ]
        
        for name, cat, prof in skills_data:
            Skill.objects.get_or_create(name=name, category=cat, proficiency=prof)
            
        # Education
        edu_data = {
            'degree': 'BS – Software Engineering',
            'school': 'Sir Syed University of Engineering and Technology',
            'start_year': '2023',
            'end_year': '2027',
            'description': '6th Semester Student. Focusing on AI, Machine Learning, and Software Engineering. I have a strong foundation in Python, Django, and machine learning concepts. I\'m actively applying IBM-certified skills in Real-world projects, focusing on Deep Learning and Agentic AI.'
        }
        edu = Education.objects.filter(degree=edu_data['degree']).first()
        if not edu:
            Education.objects.create(**edu_data)
        else:
            for key, value in edu_data.items():
                setattr(edu, key, value)
            edu.save()
        
        # Experience
        Experience.objects.get_or_create(
            title='Software Engineer (Internship)',
            company='Seeking Internship',
            description='Currently seeking an internship role in AI, Machine Learning, or Software Engineering.',
            start_date=date(2025, 1, 1),
            is_current=True
        )
        
        # Projects
        project_data = [
            {
                'title': 'Business AI Meeting Assistant',
                'description': 'AI-driven notebook for summarizing and analyzing business meetings using LLMs.',
                'git_link': 'https://github.com/muhammad-hassn/AI-and-ML-Projects/blob/main/Business_AI_Meeting.ipynb',
                'categories': ['AI/ML', 'Python']
            },
            {
                'title': 'DPO Fine-Tuning v1',
                'description': 'Direct Preference Optimization (DPO) implementation for fine-tuning large language models.',
                'git_link': 'https://github.com/muhammad-hassn/AI-and-ML-Projects/blob/main/DPO_Fine_Tuning_v1_(1).ipynb',
                'categories': ['AI/ML', 'Deep Learning']
            },
            {
                'title': 'AI RAG Assistant (LangChain)',
                'description': 'Built an AI RAG Assistant using LangChain for efficient document retrieval and answering.',
                'git_link': 'https://github.com/muhammad-hassn/AI-and-ML-Projects/blob/main/Graded_Assignment_Final_Project_Build_an_AI_RAG_Assistant_Using_LangChain.ipynb',
                'categories': ['AI/ML', 'LangChain']
            },
            {
                'title': 'Image Captioning AI',
                'description': 'IBM Skills Network project for generating automated captions for images using computer vision.',
                'git_link': 'https://github.com/muhammad-hassn/AI-and-ML-Projects/blob/main/Image_Captioning_AI_(IBM_Skills_Network)%20(1).ipynb',
                'categories': ['AI/ML', 'Computer Vision']
            },
            {
                'title': 'Rainfall Prediction Classifier',
                'description': 'Machine Learning classifier to predict rainfall patterns based on historical data.',
                'git_link': 'https://github.com/muhammad-hassn/AI-and-ML-Projects/blob/main/Rainfall_Prediction_Classifier.ipynb',
                'categories': ['AI/ML', 'Scikit-Learn']
            },
            {
                'title': 'Nasim and SON - Django Website',
                'description': 'A professional business website built with Django, featuring modern UI and custom backend.',
                'live_link': 'https://better-hester-hassanprojects-98ecd66a.koyeb.app/',
                'categories': ['Web', 'Django']
            },
            {
                'title': 'Grocery Management System',
                'description': 'Full-stack web application for managing inventory and sales in a grocery store environment.',
                'git_link': 'https://github.com/muhammad-hassn/WebProjects/tree/main/gerocery_management',
                'categories': ['Web', 'Management']
            },
            {
                'title': 'Car Rental System (C#)',
                'description': 'A robust desktop/web application for managing car rentals, built using C# and .NET.',
                'git_link': 'https://github.com/muhammad-hassn/WebProjects/tree/main/Car_Rental_System',
                'categories': ['Web', 'C#']
            },
            {
                'title': 'Ecommerce Web Project',
                'description': 'Scalable ecommerce platform with product listings, cart functionality, and user authentication.',
                'git_link': 'https://github.com/muhammad-hassn/WebProjects/tree/main/EcommerceWeb',
                'categories': ['Web', 'Ecommerce']
            }
        ]

        for p_data in project_data:
            categories = p_data.pop('categories')
            project, created = Project.objects.get_or_create(title=p_data['title'], defaults=p_data)
            for cat_name in categories:
                cat, _ = Category.objects.get_or_create(name=cat_name)
                project.categories.add(cat)
                
        # Certifications
        certs = [
            ('IBM AI Engineering', 'IBM'),
            ('IBM Machine Learning Engineering', 'IBM'),
            ('IBM Deep Learning', 'IBM'),
            ('Agentic AI and AI Agents with Python', 'IBM'),
            ('Python for Data Science, AI & Development', 'IBM'),
        ]
        
        for title, issuer in certs:
            Certification.objects.get_or_create(title=title, issued_by=issuer)

        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))
