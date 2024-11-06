import React, { forwardRef } from 'react';
import { useResumeStore } from '../store/resumeStore';

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { personalInfo, skills } = useResumeStore();

  return (
    <div ref={ref} className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h2>
        <div className="text-gray-600 mt-2">
          <p>{personalInfo.email} | {personalInfo.phone}</p>
          <p>{personalInfo.linkedin}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Professional Summary</h3>
        <p className="text-gray-700">{personalInfo.summary}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;