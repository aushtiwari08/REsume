import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Mail, CreditCard, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { resumes, setCurrentResume, deleteResume } = useResumeStore();

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: 'Easy Resume Creation',
      description: 'Create professional resumes with our intuitive form builder',
    },
    {
      icon: <Download className="h-8 w-8 text-blue-600" />,
      title: 'Multiple Formats',
      description: 'Download your resume in PDF, JSON, or CSV format',
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: 'Email Confirmation',
      description: 'Receive your resume directly in your inbox',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: 'Secure Payment',
      description: 'Safe and secure payment processing',
    },
  ];

  const handleEditResume = (resume: any) => {
    setCurrentResume(resume);
    navigate('/create');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Professional Resume Builder</h1>
        <p className="text-xl text-gray-600">Create your perfect resume in minutes</p>
        <button
          onClick={() => {
            setCurrentResume(null);
            navigate('/create');
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="inline-block mr-2 h-5 w-5" />
          Create New Resume
        </button>
      </div>

      {resumes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl font-bold p-6 border-b">Your Resumes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resumes.map((resume) => (
                  <tr key={resume.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {resume.personalInfo.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {resume.personalInfo.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleEditResume(resume)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteResume(resume.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}