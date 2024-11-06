import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function ResumeForm() {
  const navigate = useNavigate();
  const { 
    personalInfo,
    skills,
    setPersonalInfo,
    setSkills,
    addResume,
    currentResume 
  } = useResumeStore();

  const [currentSkill, setCurrentSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resumeData = {
      personalInfo,
      education: [],
      experience: [],
      skills,
    };

    if (currentResume) {
      // Update existing resume
      addResume({
        ...resumeData,
        id: currentResume.id,
        createdAt: currentResume.createdAt,
      });
    } else {
      // Add new resume
      addResume(resumeData);
    }

    navigate('/preview');
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={personalInfo.fullName}
            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={personalInfo.linkedin}
            onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Professional Summary"
            value={personalInfo.summary}
            onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
            className="input-field md:col-span-2"
            rows={4}
            required
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="Add a skill"
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Preview Resume
        </button>
      </div>
    </form>
  );
}