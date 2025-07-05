import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AssignmentDetails from '../components/AssignmentDetails';
import EmbedContainer from '../components/EmbedContainer';

const CodePage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-1 h-full">
      {/* Sidebar - Collapsible */}
      <div className={`bg-black border-r border-gray-800 flex-shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-12' : 'w-80'
      }`}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggleCollapse={handleToggleSidebar}
          />
        </div>
      </div>
      
      <main className="flex-1 p-8 overflow-y-auto min-w-0">
        <div className="max-w-7xl mx-auto">
          <AssignmentDetails />
          
          <div className={`grid gap-8 transition-all duration-300 ${
            isSidebarCollapsed ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'
          }`}>
            {/* Code Editor Embed - Takes up more space when sidebar is collapsed */}
            <div className={`transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:col-span-3' : 'lg:col-span-2'
            }`}>
              <EmbedContainer 
                embedUrl="https://www.jdoodle.com/embed/v1/357eaa8f87a2b133"
                title="HelloWorld Assignment"
              />
            </div>
            
            {/* Right Panel with Instructions and Environment */}
            <div className="space-y-6">
              {/* Instructions Panel */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-3 tracking-wide">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>ASSIGNMENT INSTRUCTIONS</span>
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-start space-x-4 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
                      <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                      <p>Create a public class named <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm border border-gray-700">HelloWorld</code></p>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
                      <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                      <p>Add the main method with proper signature</p>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-green-500/30 transition-all duration-300">
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">3</span>
                      <p>Print "Hello, World!" and "Welcome to Java Programming!" messages</p>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300">
                      <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">4</span>
                      <p>Click Execute to run your code and see the output</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
                    <div className="relative">
                      <h4 className="text-white font-bold mb-2 flex items-center space-x-2">
                        <span className="text-cyan-400">💡</span>
                        <span className="tracking-wide">PRO TIP</span>
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {isSidebarCollapsed 
                          ? "Sidebar collapsed for more coding space! Click the menu icon to expand templates."
                          : "Use the code examples in the sidebar as reference. You can copy and paste them into the editor above."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Environment Settings */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-3 tracking-wide">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>ENVIRONMENT SETTINGS</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2 tracking-widest">JAVA VERSION</label>
                      <div className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm">
                        JDK 21.0.0
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2 tracking-widest">EDITOR CONFIG</label>
                      <div className="space-y-2">
                        <div className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm font-mono">
                          Font Size: 12px
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm font-mono">
                          Interactive Mode: Enabled
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded-lg border border-gray-700/30">
                          <span className="text-gray-400 font-medium">Auto-save</span>
                          <span className="text-green-400 font-bold tracking-wide">✓ ON</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded-lg border border-gray-700/30">
                          <span className="text-gray-400 font-medium">Syntax</span>
                          <span className="text-green-400 font-bold tracking-wide">✓ ON</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded-lg border border-gray-700/30">
                          <span className="text-gray-400 font-medium">STDIN</span>
                          <span className="text-cyan-400 font-bold tracking-wide">READY</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded-lg border border-gray-700/30">
                          <span className="text-gray-400 font-medium">Execute</span>
                          <span className="text-cyan-400 font-bold tracking-wide">READY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-3 tracking-wide">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>QUICK ACTIONS</span>
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black py-3 px-4 rounded-lg transition-all duration-300 text-sm font-bold tracking-wide border border-cyan-500/50 hover:border-cyan-400">
                      LOAD HELLOWORLD TEMPLATE
                    </button>
                    <button 
                      onClick={handleToggleSidebar}
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300 text-sm font-bold tracking-wide border border-purple-500/50 hover:border-purple-400"
                    >
                      {isSidebarCollapsed ? 'EXPAND SIDEBAR' : 'COLLAPSE SIDEBAR'}
                    </button>
                    <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 text-white py-3 px-4 rounded-lg transition-all duration-300 text-sm font-bold tracking-wide border border-gray-700 hover:border-gray-600">
                      CLEAR EDITOR
                    </button>
                    <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 text-white py-3 px-4 rounded-lg transition-all duration-300 text-sm font-bold tracking-wide border border-gray-700 hover:border-gray-600">
                      DOWNLOAD CODE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodePage;