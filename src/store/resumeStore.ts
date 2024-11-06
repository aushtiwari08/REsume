import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  summary: string;
}

interface Resume {
  id: string;
  createdAt: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

const emptyPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  summary: '',
};

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  addResume: (resume: Omit<Resume, 'id' | 'createdAt'>) => void;
  setCurrentResume: (resume: Resume | null) => void;
  deleteResume: (id: string) => void;
  setPersonalInfo: (info: PersonalInfo) => void;
  setEducation: (education: Education[]) => void;
  setExperience: (experience: Experience[]) => void;
  setSkills: (skills: string[]) => void;
  resetForm: () => void;
}

const initialState = {
  resumes: [],
  currentResume: null,
  personalInfo: emptyPersonalInfo,
  education: [],
  experience: [],
  skills: [],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      addResume: (resume) => 
        set((state) => ({
          resumes: [...state.resumes, {
            ...resume,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          }],
          currentResume: null,
        })),
      setCurrentResume: (resume) => {
        if (resume) {
          set({
            currentResume: resume,
            personalInfo: resume.personalInfo,
            education: resume.education,
            experience: resume.experience,
            skills: resume.skills,
          });
        } else {
          set({
            currentResume: null,
            personalInfo: emptyPersonalInfo,
            education: [],
            experience: [],
            skills: [],
          });
        }
      },
      deleteResume: (id) =>
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
        })),
      setPersonalInfo: (info) => set({ personalInfo: info }),
      setEducation: (education) => set({ education }),
      setExperience: (experience) => set({ experience }),
      setSkills: (skills) => set({ skills }),
      resetForm: () => set({
        currentResume: null,
        personalInfo: emptyPersonalInfo,
        education: [],
        experience: [],
        skills: [],
      }),
    }),
    {
      name: 'resume-storage',
    }
  )
);