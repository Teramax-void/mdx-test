import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Code, Layers, Database, Globe, Lock, ArrowRight, Play, Target } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface CourseSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  status: 'available' | 'coming-soon' | 'locked';
}

const CourseSections: React.FC = () => {
  const { settings } = useSettings();

  // Dynamic theme classes
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        background: 'bg-gray-50',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        card: 'bg-white border-gray-200',
        button: 'text-cyan-600 hover:text-cyan-700'
      };
    }
    return {
      background: 'bg-black',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      card: 'bg-black/50 border-gray-800',
      button: 'text-cyan-400 hover:text-cyan-300'
    };
  };

  const themeClasses = getThemeClasses();

  const courseSections: CourseSection[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Introduction to the PRO192 course, its objectives, and learning outcomes.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'course-introduction',
      title: 'Course Introduction',
      description: 'An introduction to the course structure, objectives, and the foundational concepts of object-oriented programming.',
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'Java basics: JVM, platform, data types, variables, arrays, operators, and logic constructs.',
      icon: <Code className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'encapsulation',
      title: 'Encapsulation',
      description: 'Encapsulation, classes, objects, constructors, member functions, and access modifiers in Java.',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'inheritance',
      title: 'Inheritance',
      description: 'Inheritance, is-a relationships, super/derived classes, and code reuse in Java.',
      icon: <Layers className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'polymorphism',
      title: 'Polymorphism',
      description: 'Polymorphism, method overloading/overriding, abstract classes, and interfaces.',
      icon: <Play className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'data-structures',
      title: 'Array Of Objects',
      description: 'Working with arrays of objects, collections, and data structure fundamentals.',
      icon: <Database className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'collections',
      title: 'Collections',
      description: 'Java Collections Framework, ArrayList, HashMap, and advanced data structures.',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      link: '/documentation',
      status: 'available'
    },
    {
      id: 'dynamic-memory',
      title: 'Dynamic Memory',
      description: 'Memory management, garbage collection, and dynamic object creation in Java.',
      icon: <Database className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      link: '/documentation',
      status: 'coming-soon'
    },
    {
      id: 'exception-handling',
      title: 'Exception Handling',
      description: 'Error handling, try-catch blocks, custom exceptions, and best practices.',
      icon: <Lock className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      link: '/documentation',
      status: 'coming-soon'
    },
    {
      id: 'file-io',
      title: 'File I/O',
      description: 'File operations, reading and writing data, and working with external resources.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-violet-500 to-violet-600',
      link: '/documentation',
      status: 'coming-soon'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            Available
          </span>
        );
      case 'coming-soon':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Coming Soon
          </span>
        );
      case 'locked':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            Locked
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${themeClasses.text.primary} mb-6`}>
            Course <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Sections</span>
          </h2>
          <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
            Explore the comprehensive curriculum designed to master object-oriented programming concepts and Java development.
          </p>
        </div>

        {/* Course Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseSections.map((section, index) => (
            <div
              key={section.id}
              className={`${themeClasses.card} rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden ${
                section.status === 'locked' ? 'opacity-60' : ''
              }`}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {section.icon}
                  </div>
                  {getStatusBadge(section.status)}
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-3 group-hover:text-cyan-400 transition-colors duration-300`}>
                  {section.title}
                </h3>
                <p className={`${themeClasses.text.secondary} text-sm leading-relaxed mb-6`}>
                  {section.description}
                </p>

                {/* Action */}
                {section.status === 'available' ? (
                  <Link
                    to={section.link}
                    className={`inline-flex items-center space-x-2 ${themeClasses.button} font-medium text-sm group-hover:translate-x-1 transition-all duration-300`}
                  >
                    <span>View Content</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className={`inline-flex items-center space-x-2 ${themeClasses.text.muted} text-sm`}>
                    <span>{section.status === 'coming-soon' ? 'Coming Soon' : 'Locked'}</span>
                  </div>
                )}

                {/* Progress indicator for available sections */}
                {section.status === 'available' && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-16 ${themeClasses.card} rounded-xl p-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {courseSections.filter(s => s.status === 'available').length}
                </div>
                <div className={`text-sm ${themeClasses.text.secondary} tracking-wide`}>Available Sections</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {courseSections.length}
                </div>
                <div className={`text-sm ${themeClasses.text.secondary} tracking-wide`}>Total Sections</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {Math.round((courseSections.filter(s => s.status === 'available').length / courseSections.length) * 100)}%
                </div>
                <div className={`text-sm ${themeClasses.text.secondary} tracking-wide`}>Course Progress</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {courseSections.filter(s => s.status === 'coming-soon').length}
                </div>
                <div className={`text-sm ${themeClasses.text.secondary} tracking-wide`}>Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSections;