import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Home, BookOpen, Code, Shield, Layers, Zap, ExternalLink, FileText, Settings, HelpCircle, Database, Globe, Lock } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  subsections?: { id: string; title: string }[];
}

const DocumentationPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['core-concepts']);
  const [activeSection, setActiveSection] = useState('introduction');
  const { settings } = useSettings();

  // Dynamic theme classes
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        sidebar: 'bg-white border-gray-200',
        content: 'bg-gray-50',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        button: {
          hover: 'hover:bg-gray-100',
          active: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-gray-900 border-cyan-500/30',
          inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        },
        card: 'bg-white border-gray-200'
      };
    }
    return {
      sidebar: 'bg-black border-gray-800',
      content: 'bg-black',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      button: {
        hover: 'hover:bg-gray-900/50',
        active: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-cyan-500/30',
        inactive: 'text-gray-400 hover:text-white hover:bg-gray-900/50'
      },
      card: 'bg-black/50 border-gray-800'
    };
  };

  const themeClasses = getThemeClasses();

  const docSections: DocSection[] = [
    {
      id: 'home',
      title: 'Home',
      icon: <Home className="w-4 h-4" />
    },
    {
      id: 'course-overview',
      title: 'COURSE OVERVIEW',
      icon: <BookOpen className="w-4 h-4" />,
      subsections: [
        { id: 'welcome', title: 'Welcome' },
        { id: 'introduction', title: 'Introduction' },
        { id: 'foundations', title: 'Foundations' }
      ]
    },
    {
      id: 'core-concepts',
      title: 'CORE CONCEPTS',
      icon: <Code className="w-4 h-4" />,
      subsections: [
        { id: 'encapsulation', title: 'Encapsulation' },
        { id: 'inheritance', title: 'Inheritance' },
        { id: 'polymorphism', title: 'Polymorphism' }
      ]
    },
    {
      id: 'advanced-topics',
      title: 'ADVANCED TOPICS',
      icon: <Zap className="w-4 h-4" />,
      subsections: [
        { id: 'design-patterns', title: 'Design Patterns' },
        { id: 'collections', title: 'Collections Framework' },
        { id: 'exception-handling', title: 'Exception Handling' }
      ]
    },
    {
      id: 'data-structures',
      title: 'DATA STRUCTURES',
      icon: <Database className="w-4 h-4" />,
      subsections: [
        { id: 'arrays', title: 'Arrays' },
        { id: 'linked-lists', title: 'Linked Lists' },
        { id: 'stacks-queues', title: 'Stacks & Queues' }
      ]
    },
    {
      id: 'web-integration',
      title: 'WEB INTEGRATION',
      icon: <Globe className="w-4 h-4" />,
      subsections: [
        { id: 'servlets', title: 'Servlets' },
        { id: 'jsp', title: 'JSP' },
        { id: 'spring-basics', title: 'Spring Basics' }
      ]
    },
    {
      id: 'security',
      title: 'SECURITY',
      icon: <Lock className="w-4 h-4" />,
      subsections: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'authorization', title: 'Authorization' },
        { id: 'best-practices', title: 'Best Practices' }
      ]
    },
    {
      id: 'resources',
      title: 'RESOURCES',
      icon: <FileText className="w-4 h-4" />,
      subsections: [
        { id: 'cheat-sheets', title: 'Cheat Sheets' },
        { id: 'examples', title: 'Code Examples' },
        { id: 'references', title: 'References' }
      ]
    },
    {
      id: 'help',
      title: 'HELP & SUPPORT',
      icon: <HelpCircle className="w-4 h-4" />,
      subsections: [
        { id: 'faq', title: 'FAQ' },
        { id: 'troubleshooting', title: 'Troubleshooting' },
        { id: 'contact', title: 'Contact Support' }
      ]
    },
    {
      id: 'settings',
      title: 'SETTINGS',
      icon: <Settings className="w-4 h-4" />,
      subsections: [
        { id: 'preferences', title: 'Preferences' },
        { id: 'theme', title: 'Theme Settings' },
        { id: 'notifications', title: 'Notifications' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Object-Oriented Programming using
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Java (PRO192)
                </span>
              </h1>
              <p className={`text-xl ${themeClasses.text.secondary} leading-relaxed`}>
                Welcome to Object-Oriented Programming using Java course. This comprehensive course introduces students to object-oriented programming concepts, Java language fundamentals, and practical programming skills.
              </p>
            </div>

            <div className={`${themeClasses.card} rounded-xl p-8 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
              <div className="relative">
                <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 flex items-center space-x-3`}>
                  <Zap className="w-6 h-6 text-cyan-400" />
                  <span>Course Overview</span>
                </h2>
                <p className={`${themeClasses.text.secondary} leading-relaxed mb-6`}>
                  This course introduces students to object-oriented programming using the Java programming language. Students will learn fundamental concepts of object-oriented design and implementation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>What You'll Learn</h3>
                    <ul className={`space-y-2 ${themeClasses.text.secondary}`}>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Object-oriented programming principles</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Java syntax and language features</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Class design and implementation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Inheritance and polymorphism</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>Prerequisites</h3>
                    <ul className={`space-y-2 ${themeClasses.text.secondary}`}>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Basic programming knowledge</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Understanding of variables and control structures</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Problem-solving skills</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.card} rounded-xl p-8 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
              <div className="relative">
                <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 flex items-center space-x-3`}>
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <span>Learning Outcomes</span>
                </h2>
                <div className="space-y-4">
                  <div className={`flex items-start space-x-4 p-4 ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-900/30'} rounded-lg border ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-700/30'} hover:border-cyan-500/30 transition-all duration-300`}>
                    <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span className={themeClasses.text.secondary}>Understand object-oriented programming concepts</span>
                  </div>
                  <div className={`flex items-start space-x-4 p-4 ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-900/30'} rounded-lg border ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-700/30'} hover:border-purple-500/30 transition-all duration-300`}>
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span className={themeClasses.text.secondary}>Master Java language syntax and semantics</span>
                  </div>
                  <div className={`flex items-start space-x-4 p-4 ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-900/30'} rounded-lg border ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-700/30'} hover:border-green-500/30 transition-all duration-300`}>
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span className={themeClasses.text.secondary}>Design and implement object-oriented solutions</span>
                  </div>
                  <div className={`flex items-start space-x-4 p-4 ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-900/30'} rounded-lg border ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-700/30'} hover:border-yellow-500/30 transition-all duration-300`}>
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span className={themeClasses.text.secondary}>Apply inheritance and polymorphism principles</span>
                  </div>
                  <div className={`flex items-start space-x-4 p-4 ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-900/30'} rounded-lg border ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-700/30'} hover:border-blue-500/30 transition-all duration-300`}>
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <span className={themeClasses.text.secondary}>Develop debugging and testing skills</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'encapsulation':
        return (
          <div className="space-y-8">
            <div>
              <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-6`}>Encapsulation</h1>
              <p className={`text-xl ${themeClasses.text.secondary} leading-relaxed`}>
                Learn about data hiding and access control in object-oriented programming.
              </p>
            </div>
            
            <div className={`${themeClasses.card} rounded-xl p-8`}>
              <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4`}>What is Encapsulation?</h2>
              <p className={`${themeClasses.text.secondary} leading-relaxed mb-6`}>
                Encapsulation is one of the fundamental principles of object-oriented programming. It refers to the bundling of data and methods that operate on that data within a single unit or class.
              </p>
              
              <div className={`${settings.theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-900/50 border-gray-700'} rounded-lg p-6 border`}>
                <h3 className={`text-lg font-bold ${themeClasses.text.primary} mb-4`}>Key Benefits</h3>
                <ul className={`space-y-2 ${themeClasses.text.secondary}`}>
                  <li>• Data protection and security</li>
                  <li>• Code maintainability</li>
                  <li>• Modularity and reusability</li>
                  <li>• Controlled access to class members</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-8">
            <div>
              <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-6`}>Documentation</h1>
              <p className={`text-xl ${themeClasses.text.secondary} leading-relaxed`}>
                Select a topic from the sidebar to view detailed documentation.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 h-full">
      {/* Sidebar - Fixed Position */}
      <div className={`fixed left-0 top-20 w-80 h-[calc(100vh-5rem)] ${themeClasses.sidebar} border-r z-30`}>
        <div className="h-full overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-gray-900/20 pointer-events-none"></div>
          
          <div className="relative p-6 space-y-6">
            {/* Navigation */}
            <div className="space-y-1">
              {docSections.map((section) => (
                <div key={section.id}>
                  {section.subsections ? (
                    <>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`flex items-center justify-between w-full ${themeClasses.text.primary} font-medium py-3 px-4 ${themeClasses.button.hover} rounded-lg transition-all duration-300 group relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className={`p-1.5 rounded-md group-hover:${settings.theme === 'light' ? 'bg-gray-200' : 'bg-gray-800/50'} transition-all duration-300 group-hover:scale-110`}>
                            {section.icon}
                          </div>
                          <span className="text-sm tracking-widest font-semibold group-hover:text-cyan-400 transition-colors duration-300">{section.title}</span>
                        </div>
                        <div className={`p-1 rounded-md group-hover:${settings.theme === 'light' ? 'bg-gray-200' : 'bg-gray-800/50'} transition-all duration-300 relative z-10`}>
                          {expandedSections.includes(section.id) ? 
                            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:text-cyan-400" /> : 
                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:text-cyan-400" />
                          }
                        </div>
                      </button>
                      
                      {expandedSections.includes(section.id) && (
                        <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {section.subsections.map((subsection) => (
                            <button
                              key={subsection.id}
                              onClick={() => setActiveSection(subsection.id)}
                              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 text-left group relative overflow-hidden ${
                                activeSection === subsection.id
                                  ? `${themeClasses.button.active} shadow-lg shadow-cyan-500/10`
                                  : themeClasses.button.inactive
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                activeSection === subsection.id 
                                  ? 'bg-cyan-400 animate-pulse' 
                                  : `${settings.theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'} group-hover:bg-cyan-400`
                              }`}></div>
                              <span className="text-sm font-medium">{subsection.title}</span>
                              {activeSection === subsection.id && (
                                <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                        activeSection === section.id
                          ? `${themeClasses.button.active} shadow-lg shadow-cyan-500/10`
                          : themeClasses.button.inactive
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className={`p-1.5 rounded-md transition-all duration-300 relative z-10 ${
                        activeSection === section.id 
                          ? 'bg-cyan-500/20 text-cyan-400' 
                          : `group-hover:${settings.theme === 'light' ? 'bg-gray-200' : 'bg-gray-800/50'} group-hover:scale-110`
                      }`}>
                        {section.icon}
                      </div>
                      <span className="text-sm font-medium relative z-10">{section.title}</span>
                      {activeSection === section.id && (
                        <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className={`pt-6 border-t ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-800/50'}`}>
              <h3 className={`text-xs font-bold ${themeClasses.text.muted} uppercase tracking-widest mb-4`}>QUICK LINKS</h3>
              <div className="space-y-2">
                <a href="#" className={`flex items-center space-x-3 ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-300 text-sm group`}>
                  <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>Java Documentation</span>
                </a>
                <a href="#" className={`flex items-center space-x-3 ${themeClasses.text.secondary} hover:text-purple-400 transition-colors duration-300 text-sm group`}>
                  <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>Oracle Tutorials</span>
                </a>
                <a href="#" className={`flex items-center space-x-3 ${themeClasses.text.secondary} hover:text-green-400 transition-colors duration-300 text-sm group`}>
                  <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>Course Resources</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div className="flex-1 flex min-w-0 ml-80">
        {/* Content Area */}
        <div className={`flex-1 p-8 overflow-y-auto ${themeClasses.content}`}>
          {/* Breadcrumb */}
          <div className={`flex items-center space-x-2 text-sm ${themeClasses.text.secondary} mb-8`}>
            <span>Docs</span>
            <ChevronRight className="w-4 h-4" />
            <span>Getting Started</span>
            <ChevronRight className="w-4 h-4" />
            <span className={themeClasses.text.primary}>Introduction</span>
          </div>
          
          <div className="max-w-4xl">
            {renderContent()}
          </div>
        </div>
        
        {/* Table of Contents - Also Sticky */}
        <div className={`w-64 ${themeClasses.sidebar} border-l flex-shrink-0`}>
          <div className="sticky top-0 h-screen overflow-y-auto p-8">
            <h3 className={`text-sm font-bold ${themeClasses.text.secondary} mb-4 tracking-widest`}>ON THIS PAGE</h3>
            <div className="space-y-2">
              <a href="#course-overview" className={`block text-sm ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-300`}>
                Course Overview
              </a>
              <a href="#learning-outcomes" className={`block text-sm ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-300`}>
                Learning Outcomes
              </a>
              <a href="#getting-started" className={`block text-sm ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-300`}>
                Getting Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;