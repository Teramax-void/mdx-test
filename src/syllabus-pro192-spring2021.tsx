import React from 'react';
import SyllabusSheet001 from './docs/Syllabus_mat/sheet001.mdx';
import SyllabusSheet002 from './docs/Syllabus_mat/sheet002.mdx';
import SyllabusSheet003 from './docs/Syllabus_mat/sheet003.mdx';
import SyllabusSheet004 from './docs/Syllabus_mat/sheet004.mdx';
import SyllabusSheet005 from './docs/Syllabus_mat/sheet005.mdx';
import BackToTop from './components/BackToTop';
import './styles/mdx-content.css';
import './styles/professional-syllabus.css';

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
        {/* Professional Header */}
        <div className="syllabus-header bg-white px-8 py-6">
          <h1>Course Syllabus</h1>
          <p className="subtitle">Object-Oriented Programming using Java (PRO192)</p>
        </div>

        {/* Professional Tab Navigation */}
        <nav className="tab-navigation bg-white border-b border-gray-200 px-8" aria-label="Syllabus Sections">
          <div className="flex gap-1 -mb-px">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                className={`tab-button ${tab === i ? 'active' : ''}`}
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
          <div className="content-section">
            {TABS[tab].content}
          </div>
        </section>

        {/* Action Button Example */}
        <div className="px-8 py-6 bg-gray-50 border-t">
          <div className="text-center">
            <button className="professional-button" type="button">
              Download Syllabus PDF
            </button>
          </div>
        </div>
      </div>
      
      <BackToTop />
    </div>
  );
}