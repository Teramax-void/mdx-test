import React from 'react';
import { Clock, Users, BookOpen, CheckCircle, Zap, Target } from 'lucide-react';

const AssignmentDetails: React.FC = () => {
  return (
    <div className="bg-black border border-gray-800 rounded-xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-wide">HelloWorld Assignment</h2>
              <p className="text-gray-400 text-sm tracking-wide">JAVA FUNDAMENTALS • BEGINNER LEVEL</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">ACTIVE</span>
          </div>
        </div>
        
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          Master the fundamentals of Java programming by creating your first "Hello World" application. 
          This assignment introduces essential concepts including class structure, main method implementation, and output statements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-all duration-300">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Duration</p>
                <p className="font-bold text-white text-lg">30 minutes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Difficulty</p>
                <p className="font-bold text-white text-lg">Beginner</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Language</p>
                <p className="font-bold text-white text-lg">Java</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">LEARNING OBJECTIVES</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Understand basic Java class structure and syntax</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Learn about the main method signature and execution</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-green-500/30 transition-all duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Practice using System.out.println() for console output</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Compile and execute your first Java program</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;