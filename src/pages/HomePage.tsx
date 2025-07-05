import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, Play, Code, Users, Clock, Target, Zap, ArrowRight, CheckCircle, Star, Award, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative text-center max-w-6xl mx-auto">
          {/* Course Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Code className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-wide">Object-Oriented Programming</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Object Oriented
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Programming using Java
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive course exploring object-oriented programming concepts, design 
            principles, and practical implementation in Java.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link 
              to="/documentation"
              className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black px-8 py-4 rounded-lg transition-all duration-300 font-bold tracking-wide border border-cyan-500/50 hover:border-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 group"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explore Course Sections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <button className="flex items-center space-x-3 bg-gray-900/50 hover:bg-gray-800/50 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold tracking-wide border border-gray-700 hover:border-gray-600 backdrop-blur-sm group">
              <Download className="w-5 h-5" />
              <span>Download Syllabus</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Course Features */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">PRO192</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Master object-oriented programming with hands-on projects, interactive coding environments, and comprehensive learning materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Interactive Learning</h3>
                <p className="text-gray-400 leading-relaxed">
                  Code directly in your browser with our integrated development environment. No setup required.
                </p>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Real-time Feedback</h3>
                <p className="text-gray-400 leading-relaxed">
                  Get instant feedback on your code with automated testing and comprehensive error reporting.
                </p>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-green-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Progress Tracking</h3>
                <p className="text-gray-400 leading-relaxed">
                  Monitor your learning journey with detailed analytics and achievement milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Start */}
      <section className="py-24 px-8 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Start <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Coding</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Jump into your first assignment and begin your journey into object-oriented programming.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/assignments"
              className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black px-8 py-4 rounded-lg transition-all duration-300 font-bold tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 group"
            >
              <Code className="w-5 h-5" />
              <span>Start First Assignment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              to="/documentation"
              className="flex items-center space-x-3 bg-gray-900/50 hover:bg-gray-800/50 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold tracking-wide border border-gray-700 hover:border-gray-600 backdrop-blur-sm"
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