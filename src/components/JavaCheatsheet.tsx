import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  FileText,
  Code2,
  Zap,
  Download
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import cheatsheetContent from '../content/java-cheatsheet.md?raw';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

const JavaCheatsheet: React.FC = () => {
  const { settings } = useSettings();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Memoize TOC extraction to prevent recalculation on every render
  const tocItems = useMemo(() => {
    const lines = cheatsheetContent.split('\n');
    const toc: TocItem[] = [];
    
    lines.forEach(line => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2];
        const id = title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        if (level <= 3) { // Only include h1, h2, h3
          toc.push({ id, title, level });
        }
      }
    });
    
    return toc;
  }, []);

  // Memoize filtered content to prevent recalculation
  const filteredContent = useMemo(() => {
    return searchTerm 
      ? cheatsheetContent
          .split('\n')
          .filter(line => 
            line.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .join('\n')
      : cheatsheetContent;
  }, [searchTerm]);

  // Handle scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3');
      let current = '';
      
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyCode = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsTocOpen(false);
    }
  }, []);

  const toggleToc = useCallback(() => {
    setIsTocOpen(prev => !prev);
  }, []);

  const isDarkMode = settings.theme === 'dark';

  // Memoize markdown components to prevent recreation on every render
  const markdownComponents = useMemo(() => ({
    h1: ({ children, ...props }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h1 id={id} className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0 flex items-center space-x-3" {...props}>
          <Zap className="w-6 h-6 text-cyan-400" />
          <span>{children}</span>
        </h1>
      );
    },
    h2: ({ children, ...props }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h2 id={id} className="text-2xl font-bold text-white mb-4 mt-10 border-b border-gray-800 pb-2" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h3 id={id} className="text-xl font-bold text-white mb-3 mt-8" {...props}>
          {children}
        </h3>
      );
    },
    p: ({ children, ...props }: any) => (
      <p className="text-gray-300 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="text-gray-300 mb-4 space-y-1" {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }: any) => (
      <li className="flex items-start space-x-2" {...props}>
        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
        <span>{children}</span>
      </li>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      
      if (!inline && match) {
        return (
          <div className="relative group mb-6">
            <div className="bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
              {/* Code header */}
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 px-4 py-3 border-b border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400 font-mono">{match[1]}</span>
                </div>
                
                <button
                  onClick={() => handleCopyCode(codeString)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                >
                  {copiedCode === codeString ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-medium text-green-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-xs font-medium">COPY</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Code content */}
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  style={isDarkMode ? oneDark : oneLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <code 
          className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono border border-gray-700" 
          {...props}
        >
          {children}
        </code>
      );
    },
    blockquote: ({ children, ...props }: any) => (
      <blockquote 
        className="border-l-4 border-cyan-500 bg-cyan-500/10 pl-4 py-2 my-4 text-gray-300 italic" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="bg-gray-800 text-white font-bold p-3 text-left border border-gray-700" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="bg-gray-900/30 text-gray-300 p-3 border border-gray-700" {...props}>
        {children}
      </td>
    ),
  }), [isDarkMode, copiedCode, handleCopyCode]);

  return (
    <div className="flex flex-1 h-full">
      {/* Table of Contents Sidebar - Optimized for smooth transitions */}
      <div className={`fixed left-0 top-20 w-80 h-[calc(100vh-5rem)] bg-black border-r border-gray-800 z-40 transform transition-transform duration-200 ease-out will-change-transform ${
        isTocOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="h-full overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-gray-900/20 pointer-events-none"></div>
          
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">Java Cheatsheet</h2>
                  <p className="text-xs text-gray-400 tracking-wide">QUICK REFERENCE</p>
                </div>
              </div>
              
              <button
                onClick={toggleToc}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cheatsheet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Table of Contents */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">TABLE OF CONTENTS</h3>
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                  }`}
                  style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                >
                  <ChevronRight className={`w-3 h-3 mr-2 transition-transform duration-300 ${
                    activeSection === item.id ? 'rotate-90 text-cyan-400' : 'group-hover:translate-x-1'
                  }`} />
                  <span className="text-sm font-medium truncate">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">QUICK ACTIONS</h3>
              <div className="space-y-2">
                <button className="flex items-center space-x-3 w-full text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm group">
                  <Download className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-3 w-full text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm group">
                  <Code2 className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>View Source</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Optimized layout */}
      <div className={`flex-1 transition-all duration-200 ease-out will-change-auto ${isTocOpen ? 'lg:ml-80' : 'lg:ml-80'}`}>
        {/* Mobile TOC Toggle */}
        <div className="lg:hidden fixed top-24 left-4 z-50">
          <button
            onClick={toggleToc}
            className="p-3 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area - Prevent layout shifts */}
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-wide">Java Programming Cheatsheet</h1>
                <p className="text-gray-400 text-lg tracking-wide">Complete reference for Java programming concepts</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-black/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{tocItems.length}</div>
                <div className="text-sm text-gray-400 tracking-wide">Sections</div>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">50+</div>
                <div className="text-sm text-gray-400 tracking-wide">Code Examples</div>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                <div className="text-sm text-gray-400 tracking-wide">Coverage</div>
              </div>
            </div>

            {searchTerm && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-medium">Search Results for: "{searchTerm}"</span>
                </div>
              </div>
            )}
          </div>

          {/* Markdown Content - Memoized for performance */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {filteredContent}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                <span className="text-cyan-400">📚</span>
                <span>Additional Resources</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <a href="https://docs.oracle.com/javase/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                  → Official Java Documentation
                </a>
                <a href="https://www.oracle.com/java/technologies/javase-tutorials.html" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  → Oracle Java Tutorials
                </a>
                <a href="https://github.com/topics/java" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors duration-300">
                  → Java Projects on GitHub
                </a>
                <a href="https://stackoverflow.com/questions/tagged/java" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
                  → Java Questions on Stack Overflow
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay - Optimized */}
      {isTocOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-200"
          onClick={toggleToc}
        />
      )}
    </div>
  );
};

export default JavaCheatsheet;