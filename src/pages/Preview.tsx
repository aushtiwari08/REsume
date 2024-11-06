import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { CreditCard } from 'lucide-react';
import ResumePreview from '../components/ResumePreview';
import DownloadButtons from '../components/DownloadButtons';

export default function Preview() {
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resume Preview</h1>
        <div className="flex gap-4">
          <DownloadButtons onPrint={handlePrint} />
          <button
            onClick={() => navigate('/payment')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            <CreditCard className="h-5 w-5" />
            Purchase
          </button>
        </div>
      </div>

      <ResumePreview ref={resumeRef} />
    </div>
  );
}