// src/hooks/useResume.js
import { create } from 'zustand';

const useResume = create((set, get) => ({
    selectedTemplate: 'classic',
    resumeData: {
        personalInfo: {
            firstName: '',
            lastName: '',
            jobTitle: '',
            email: '',
            phone: '',
            summary: ''
        },
        education: [], // A list of schools
        projects: [],  // A list of projects
        experience: [], // A list of previous jobs
        education: [],  // A list of schools
        skills: []      // A list of text tags
    },
    setTemplate: (templateId) => set({ selectedTemplate: templateId }),
    setResumeData: (data) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            ...data,
            personalInfo: {
                ...state.resumeData.personalInfo,
                ...(data.personalInfo || {})
            }
        }
    })),
    loadSampleData: () => set({
        resumeData: {
            personalInfo: {
                firstName: 'Alex',
                lastName: 'Morgan',
                jobTitle: 'Senior Full Stack & AI Engineer',
                email: 'alex.morgan@example.com',
                phone: '+1 (555) 019-2834',
                summary: 'Results-driven Senior Full Stack and Machine Learning Engineer with 6+ years of experience architecting distributed cloud systems, implementing production NLP pipelines, and optimizing high-throughput web applications.'
            },
            experience: [
                {
                    id: 1,
                    company: 'Stripe',
                    role: 'Senior Software Engineer',
                    startDate: '2022-03',
                    endDate: 'Present',
                    description: '• Architected and scaled microservices handling 40M+ daily events using FastAPI, Python, and PostgreSQL.\n• Designed semantic search retrieval system using Sentence Transformers and pgvector, reducing latency by 45%.'
                },
                {
                    id: 2,
                    company: 'DataMetrics Corp',
                    role: 'Full Stack Engineer',
                    startDate: '2019-06',
                    endDate: '2022-02',
                    description: '• Developed responsive React and TypeScript dashboards serving 150k active business analysts.\n• Integrated Docker containerized CI/CD pipelines on AWS ECS, improving release velocity by 60%.'
                }
            ],
            education: [
                {
                    id: 1,
                    school: 'University of California, Berkeley',
                    degree: 'B.S. in Computer Science',
                    startDate: '2015',
                    endDate: '2019',
                    description: 'Graduated with Honors. Coursework: Distributed Systems, Natural Language Processing, Machine Learning.'
                }
            ],
            projects: [
                {
                    id: 1,
                    title: 'AI Resume Intelligence Platform',
                    link: 'https://github.com/abhiram2903/AIResumeBuilder',
                    description: 'Built full-stack AI platform with spaCy skill extraction, Sentence Transformers semantic matching, and ReportLab ATS PDF generation.'
                }
            ],
            skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'spaCy', 'Sentence Transformers', 'PyTorch', 'AWS', 'Tailwind CSS', 'Git']
        }
    }),
    updatePersonalInfo: (fieldId, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            personalInfo: {
                ...state.resumeData.personalInfo,
                [fieldId]: value
            }
        }
    })),

    addEducation: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            education: [
                ...state.resumeData.education,
                { id: Date.now(), school: '', degree: '', startDate: '', endDate: '', description: '' }
            ]
        }
    })),

    updateEducation: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }
    })),

    addProject: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            projects: [
                ...state.resumeData.projects,
                { id: Date.now(), title: '', link: '', description: '' }
            ]
        }
    })),

    updateProject: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        }
    })),

    addExperience: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            experience: [
                ...state.resumeData.experience,
                {
                    id: Date.now(),
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        }
    })),

    updateExperience: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }
    })),

    addSkill: (skill) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill]
        }
    })),

    removeSkill: (indexToRemove) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((_, index) => index !== indexToRemove)
        }
    })),

    getResumeAsPlainText: () => {
        const { resumeData } = get();
        const personal = resumeData.personalInfo || {};
        const parts = [];
        const name = `${personal.firstName || ''} ${personal.lastName || ''}`.trim();
        if (name) parts.push(name);
        if (personal.jobTitle) parts.push(personal.jobTitle);
        const contacts = [personal.email, personal.phone, personal.location].filter(Boolean);
        if (contacts.length) parts.push(contacts.join(' | '));
        if (personal.summary) parts.push(`\nSummary:\n${personal.summary}`);

        if (resumeData.skills && resumeData.skills.length) {
            parts.push(`\nSkills:\n${resumeData.skills.join(', ')}`);
        }
        if (resumeData.experience && resumeData.experience.length) {
            parts.push('\nExperience:');
            resumeData.experience.forEach((exp) => {
                parts.push(`${exp.role || 'Role'} at ${exp.company || 'Company'} (${exp.startDate || ''} - ${exp.endDate || 'Present'})`);
                if (exp.description) parts.push(exp.description);
            });
        }
        if (resumeData.projects && resumeData.projects.length) {
            parts.push('\nProjects:');
            resumeData.projects.forEach((p) => {
                parts.push(`${p.title || 'Project'}${p.link ? ` (${p.link})` : ''}`);
                if (p.description) parts.push(p.description);
            });
        }
        if (resumeData.education && resumeData.education.length) {
            parts.push('\nEducation:');
            resumeData.education.forEach((edu) => {
                parts.push(`${edu.school || 'School'} - ${edu.degree || 'Degree'} (${edu.startDate || ''} - ${edu.endDate || ''})`);
                if (edu.description) parts.push(edu.description);
            });
        }
        return parts.join('\n');
    }
}));

export default useResume;