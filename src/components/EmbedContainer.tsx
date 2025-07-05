import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, RotateCcw, Play, Settings, ExternalLink, Code2, Terminal, Cpu } from 'lucide-react';

interface EmbedContainerProps {
  embedUrl: string;
  title?: string;
}

const EmbedContainer: React.FC<EmbedContainerProps> = ({ embedUrl, title = "Java Code Editor" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [embedError, setEmbedError] = useState<string | null>(null);
  const [embedHeight, setEmbedHeight] = useState(700);

  useEffect(() => {
    // Load the pym script if it doesn't exist
    const loadPymScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script already exists
        if (window.pym) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.jdoodle.com/assets/jdoodle-pym.min.js';
        script.type = 'text/javascript';
        script.async = true;
        
        script.onload = () => {
          resolve();
        };
        
        script.onerror = () => {
          reject(new Error('Failed to load JDoodle pym script'));
        };
        
        document.head.appendChild(script);
      });
    };

    // Initialize the embed
    const initializeEmbed = async () => {
      try {
        setIsLoading(true);
        setEmbedError(null);
        
        await loadPymScript();
        
        if (containerRef.current) {
          // Clear any existing content
          containerRef.current.innerHTML = '';
          
          // Create the embed div
          const embedDiv = document.createElement('div');
          embedDiv.setAttribute('data-pym-src', embedUrl);
          embedDiv.style.width = '100%';
          embedDiv.style.height = '100%';
          embedDiv.style.border = 'none';
          embedDiv.style.overflow = 'hidden';
          containerRef.current.appendChild(embedDiv);
          
          // Initialize pym if available
          if (window.pym && window.pym.Parent) {
            const pymParent = new window.pym.Parent(embedDiv, embedUrl, {});
            
            // Listen for height changes
            pymParent.onMessage('height', (height: string) => {
              const newHeight = parseInt(height, 10);
              if (newHeight > 500) {
                setEmbedHeight(Math.min(newHeight + 50, 900));
              }
            });
            
            // Set loading to false after a short delay
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Failed to initialize JDoodle embed:', error);
        setEmbedError('Failed to load code editor. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initializeEmbed();

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [embedUrl]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const refreshEmbed = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      setIsLoading(true);
      setEmbedError(null);
      
      // Re-initialize after a short delay
      setTimeout(() => {
        const embedDiv = document.createElement('div');
        embedDiv.setAttribute('data-pym-src', embedUrl);
        embedDiv.style.width = '100%';
        embedDiv.style.height = '100%';
        embedDiv.style.border = 'none';
        embedDiv.style.overflow = 'hidden';
        containerRef.current?.appendChild(embedDiv);
        
        if (window.pym && window.pym.Parent) {
          new window.pym.Parent(embedDiv, embedUrl, {});
          setTimeout(() => setIsLoading(false), 3000);
        }
      }, 500);
    }
  };

  const openInNewTab = () => {
    window.open(embedUrl.replace('/embed/', '/'), '_blank');
  };

  return (
    <div className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10 relative">
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>
      
      <div className="relative bg-black rounded-xl overflow-hidden">
        {/* Futuristic Header */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 px-6 py-4 border-b border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
                  <p className="text-sm text-gray-400 tracking-wide">INTERACTIVE DEVELOPMENT ENVIRONMENT</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={refreshEmbed}
                className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 group border border-transparent hover:border-gray-700"
                title="Refresh Editor"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              
              <button
                onClick={openInNewTab}
                className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-transparent hover:border-gray-700"
                title="Open in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <div className="w-px h-6 bg-gray-700"></div>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-transparent hover:border-gray-700"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-black px-6 py-3 flex items-center justify-between text-sm border-b border-gray-800">
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : embedError ? 'bg-red-400' : 'bg-green-400'}`}></div>
              <span className="font-medium tracking-wide">
                {isLoading ? 'INITIALIZING...' : embedError ? 'CONNECTION ERROR' : 'SYSTEM READY'}
              </span>
            </div>
            <div className="text-gray-600">|</div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span className="font-mono">JAVA 21.0.0</span>
            </div>
            <div className="text-gray-600">|</div>
            <div className="flex items-center space-x-2">
              <Terminal className="w-3 h-3 text-purple-400" />
              <span className="font-mono">INTERACTIVE MODE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-500 font-mono text-xs">
            <span>FONT: 12PX</span>
            <span>•</span>
            <span>JDOODLE ENGINE</span>
          </div>
        </div>
        
        {/* Embed Container */}
        <div className="relative bg-white">
          <div 
            ref={containerRef}
            className="w-full transition-all duration-300"
            style={{ height: `${embedHeight}px`, minHeight: '600px' }}
          />
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-800 border-t-cyan-400 mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white tracking-wide">LOADING JAVA EDITOR</h3>
                  <p className="text-gray-400 tracking-wide">Initializing development environment...</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {embedError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-95">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                  <Settings className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 tracking-wide">SYSTEM ERROR</h3>
                <p className="text-gray-400 mb-8 max-w-md tracking-wide">{embedError}</p>
                <button
                  onClick={refreshEmbed}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold tracking-wide border border-red-500/50"
                >
                  RETRY CONNECTION
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 px-6 py-3 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium tracking-wide">AUTO-SAVE ENABLED</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium tracking-wide">SYNTAX HIGHLIGHTING</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-3 h-3 text-cyan-400" />
                <span className="font-medium tracking-wide">EXECUTION READY</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-500">
              <span className="tracking-wide">POWERED BY</span>
              <span className="font-bold text-cyan-400 tracking-wide">JDOODLE</span>
              <span className="text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-2 py-1 rounded-md font-bold">v2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    pym: any;
  }
}

export default EmbedContainer;