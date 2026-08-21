// src/hooks/useResume.js
import { create } from 'zustand';

const useResume = create((set) => ({
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
    }))
}));

export default useResume;