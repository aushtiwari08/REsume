import React from 'react';
import { Download, Mail } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import { sendResumeEmail } from '../services/emailService';

interface DownloadButtonsProps {
  onPrint: () => void;
}

export default function DownloadButtons({ onPrint }: DownloadButtonsProps) {
  const { personalInfo, education, experience, skills } = useResumeStore();

  const downloadJSON = () => {
    const data = JSON.stringify({ personalInfo, education, experience, skills }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.fullName.replace(' ', '_')}_resume.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEmailSend = async () => {
    try {
      await sendResumeEmail({
        toEmail: personalInfo.email,
        toName: personalInfo.fullName,
      });
      alert('Resume sent to your email!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to send email');
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={onPrint}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Download className="h-5 w-5" />
        PDF
      </button>
      <button
        onClick={downloadJSON}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        <Download className="h-5 w-5" />
        JSON
      </button>
      <button
        onClick={handleEmailSend}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        <Mail className="h-5 w-5" />
        Email
      </button>
    </div>
  );
}