import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, Play, Code, Users, Clock, Target, Zap, ArrowRight, CheckCircle, Star, Award, TrendingUp } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import CourseSections from '../components/CourseSections';

const HomePage: React.FC = () => {
  const { settings } = useSettings();

  // Dynamic theme classes
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        card: 'bg-white border-gray-200',
        section: 'bg-gray-50'
      };
    }
    return {
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      card: 'bg-black/50 border-gray-800',
      section: 'bg-gradient-to-r from-gray-900/50 to-black/50'
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        {/* Simplified background elements - removed blur effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/3 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full"></div>
        </div>
        
        <div className="relative text-center max-w-6xl mx-auto">
          {/* Course Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
            <Code className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-wide">Object-Oriented Programming</span>
          </div>
          
          {/* Main Heading */}
          <h1 className={`text-6xl md:text-8xl font-bold ${themeClasses.text.primary} mb-8 leading-tight`}>
            Object Oriented
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Programming using Java
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-xl md:text-2xl ${themeClasses.text.secondary} mb-12 max-w-4xl mx-auto leading-relaxed`}>
            A comprehensive course exploring object-oriented programming concepts, design 
            principles, and practical implementation in Java.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link 
              to="/documentation"
              className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black px-8 py-4 rounded-lg transition-all duration-200 font-bold tracking-wide border border-cyan-500/50 hover:border-cyan-400 group"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explore Course Sections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <button className={`flex items-center space-x-3 ${themeClasses.card} hover:bg-gray-800/50 ${themeClasses.text.primary} px-8 py-4 rounded-lg transition-all duration-200 font-bold tracking-wide border hover:border-gray-600 group`}>
              <Download className="w-5 h-5" />
              <span>Download Syllabus</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Course Sections */}
      <CourseSections />
      
      {/* Quick Start */}
      <section className={`py-24 px-8 ${themeClasses.section}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold ${themeClasses.text.primary} mb-8`}>
            Ready to Start <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Coding</span>?
          </h2>
          <p className={`text-xl ${themeClasses.text.secondary} mb-12`}>
            Jump into your first assignment and begin your journey into object-oriented programming.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/components"
              className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black px-8 py-4 rounded-lg transition-all duration-200 font-bold tracking-wide group"
            >
              <Code className="w-5 h-5" />
              <span>Start First Assignment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link 
              to="/documentation"
              className={`flex items-center space-x-3 ${themeClasses.card} hover:bg-gray-800/50 ${themeClasses.text.primary} px-8 py-4 rounded-lg transition-all duration-200 font-bold tracking-wide border hover:border-gray-600`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Documentation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;