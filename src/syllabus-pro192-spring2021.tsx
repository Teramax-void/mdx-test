import React from 'react';
import SyllabusSheet001 from './docs/Syllabus_mat/sheet001.mdx';
import SyllabusSheet002 from './docs/Syllabus_mat/sheet002.mdx';
import SyllabusSheet003 from './docs/Syllabus_mat/sheet003.mdx';
import SyllabusSheet004 from './docs/Syllabus_mat/sheet004.mdx';
import SyllabusSheet005 from './docs/Syllabus_mat/sheet005.mdx';
import BackToTop from './components/BackToTop';
import './styles/mdx-content.css';

const TABS = [
  { label: 'Syllabus', content: <SyllabusSheet001 /> },
  { label: 'Materials', content: <SyllabusSheet002 /> },
  { label: 'Learning Outcomes', content: <SyllabusSheet003 /> },
  { label: 'Schedule', content: <SyllabusSheet004 /> },
  { label: 'Grading Structure', content: <SyllabusSheet005 /> },
];

export default function SyllabusPage() {
  const [tab, setTab] = React.useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Course Syllabus</h1>
          <p className="text-blue-100 text-sm">Object-Oriented Programming using Java (PRO192)</p>
        </div>

        {/* Tab Navigation */}
        <nav className="bg-white border-b border-gray-200 px-8" aria-label="Syllabus Sections">
          <div className="flex gap-1 -mb-px">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                className={`px-6 py-4 font-semibold text-sm border-b-2 rounded-t-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${
                  tab === i 
                    ? 'border-blue-600 text-blue-600 bg-blue-50 shadow-sm' 
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300'
                }`}
                onClick={() => setTab(i)}
                type="button"
                aria-current={tab === i ? 'page' : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <section className="mdx-content bg-white min-h-[600px]">
          {TABS[tab].content}
        </section>
      </div>
      
      <BackToTop />
    </div>
  );
}