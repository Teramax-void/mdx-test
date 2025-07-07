import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  Copy, 
  Check, 
  Search, 
  ChevronDown,
  ChevronUp,
  Hash,
  Code2,
  Zap,
  Download,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import cheatsheetContent from '../content/java-cheatsheet.md?raw';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface CodeBlock {
  id: string;
  language: string;
  code: string;
  title?: string;
}

interface ParsedSection {
  id: string;
  title: string;
  content: string;
  codeBlocks: CodeBlock[];
}

const JavaCheatsheet: React.FC = () => {
  const { settings } = useSettings();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Parse content once and memoize it
  const parsedContent = useMemo((): ParsedSection[] => {
    const sections = cheatsheetContent.split(/^## /gm).filter(Boolean);
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#+\s*/, '');
      const content = lines.slice(1).join('\n');
      const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      // Extract code blocks from content
      const codeBlocks: CodeBlock[] = [];
      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      let match;
      let blockIndex = 0;
      
      while ((match = codeBlockRegex.exec(content)) !== null) {
        codeBlocks.push({
          id: `${id}-code-${blockIndex}`,
          language: match[1] || 'java',
          code: match[2].trim(),
          title: `Example ${blockIndex + 1}`
        });
        blockIndex++;
      }
      
      return {
        id,
        title,
        content,
        codeBlocks
      };
    });
  }, []); // Only depend on the static content

  // Filter content based on search - optimized
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return parsedContent;
    
    const searchLower = searchTerm.toLowerCase();
    return parsedContent.filter(section => 
      section.title.toLowerCase().includes(searchLower) ||
      section.content.toLowerCase().includes(searchLower)
    );
  }, [parsedContent, searchTerm]);

  // Debounced search to prevent excessive filtering
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use debounced search for filtering
  const displayedSections = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return parsedContent;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return parsedContent.filter(section => 
      section.title.toLowerCase().includes(searchLower) ||
      section.content.toLowerCase().includes(searchLower)
    );
  }, [parsedContent, debouncedSearchTerm]);

  // Keyboard shortcuts - optimized
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && e.target !== document.getElementById('cheatsheet-search')) {
        e.preventDefault();
        const searchInput = document.getElementById('cheatsheet-search') as HTMLInputElement;
        searchInput?.focus();
      }
      
      if (e.key === 'Escape') {
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Optimized copy handler
  const handleCopyCode = useCallback(async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, []);

  // Optimized toggle handler
  const toggleSection = useCallback((sectionId: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  // Optimized highlight function
  const highlightText = useCallback((text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300/30 text-yellow-600 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  }, []);

  const isDarkMode = settings.theme === 'dark';

  // Memoized theme classes
  const themeClasses = useMemo(() => {
    if (settings.theme === 'light') {
      return {
        background: 'bg-gray-50',
        container: 'bg-white',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        border: 'border-gray-200',
        input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
        section: 'bg-white border-gray-200',
        code: 'bg-gray-50 border-gray-200'
      };
    }
    return {
      background: 'bg-black',
      container: 'bg-black/50',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      border: 'border-gray-800',
      input: 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400',
      section: 'bg-black/30 border-gray-800',
      code: 'bg-gray-900/50 border-gray-700'
    };
  }, [settings.theme]);

  // Memoized markdown components
  const markdownComponents = useMemo(() => ({
    h3: ({ children, ...props }: any) => (
      <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-3 mt-6 first:mt-0`} {...props}>
        {highlightText(String(children), debouncedSearchTerm)}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className={`text-base font-medium ${themeClasses.text.primary} mb-2 mt-4`} {...props}>
        {highlightText(String(children), debouncedSearchTerm)}
      </h4>
    ),
    p: ({ children, ...props }: any) => (
      <p className={`${themeClasses.text.secondary} leading-relaxed mb-4 text-sm`} {...props}>
        {typeof children === 'string' ? highlightText(children, debouncedSearchTerm) : children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className={`${themeClasses.text.secondary} mb-4 space-y-1 text-sm`} {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }: any) => (
      <li className="flex items-start space-x-2" {...props}>
        <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
        <span>{typeof children === 'string' ? highlightText(children, debouncedSearchTerm) : children}</span>
      </li>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code 
            className={`${themeClasses.code} text-cyan-400 px-1.5 py-0.5 rounded text-xs font-mono border`}
            {...props}
          >
            {children}
          </code>
        );
      }
      return null;
    },
    pre: () => null,
  }), [themeClasses, debouncedSearchTerm, highlightText]);

  // Memoized section component to prevent unnecessary re-renders
  const SectionComponent = React.memo(({ section }: { section: ParsedSection }) => {
    const isCollapsed = collapsedSections.has(section.id);
    
    return (
      <div className={`${themeClasses.section} rounded-lg border overflow-hidden`}>
        {/* Section Header */}
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-md border border-cyan-500/30 group-hover:scale-105 transition-transform duration-200">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
            <h2 className={`text-xl font-bold ${themeClasses.text.primary} text-left`}>
              {highlightText(section.title, debouncedSearchTerm)}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {section.codeBlocks.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {section.codeBlocks.length} example{section.codeBlocks.length !== 1 ? 's' : ''}
              </span>
            )}
            {isCollapsed ? (
              <ChevronDown className={`w-5 h-5 ${themeClasses.text.secondary} group-hover:text-cyan-400 transition-colors duration-200`} />
            ) : (
              <ChevronUp className={`w-5 h-5 ${themeClasses.text.secondary} group-hover:text-cyan-400 transition-colors duration-200`} />
            )}
          </div>
        </button>

        {/* Section Content - Only render when not collapsed */}
        {!isCollapsed && (
          <div className="px-4 pb-4">
            {/* Text Content */}
            <div className="prose prose-sm max-w-none mb-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {section.content.replace(/```[\s\S]*?```/g, '')}
              </ReactMarkdown>
            </div>

            {/* Code Examples */}
            {section.codeBlocks.map((codeBlock) => (
              <div key={codeBlock.id} className={`mb-4 last:mb-0 ${themeClasses.code} rounded-lg border overflow-hidden`}>
                {/* Code Header */}
                <div className={`flex items-center justify-between px-4 py-2 border-b ${themeClasses.border} bg-gray-900/20`}>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className={`text-xs ${themeClasses.text.muted} font-mono`}>
                      {codeBlock.language}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleCopyCode(codeBlock.code, codeBlock.id)}
                    className={`flex items-center space-x-1 text-xs ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-200 group`}
                  >
                    {copiedCode === codeBlock.id ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Code Content */}
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    style={isDarkMode ? oneDark : oneLight}
                    language={codeBlock.language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: 'transparent',
                      fontSize: '0.8rem',
                      lineHeight: '1.4',
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                    }}
                  >
                    {codeBlock.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      {/* Sticky Header */}
      <div className={`sticky top-20 z-30 ${themeClasses.container} border-b ${themeClasses.border} backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${themeClasses.text.primary}`}>Java Cheatsheet</h1>
                <p className={`text-sm ${themeClasses.text.muted}`}>Quick reference for Java programming</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button className={`p-2 ${themeClasses.text.secondary} hover:${themeClasses.text.primary} hover:bg-gray-800/50 rounded-lg transition-all duration-200`}>
                <Download className="w-4 h-4" />
              </button>
              <button className={`p-2 ${themeClasses.text.secondary} hover:${themeClasses.text.primary} hover:bg-gray-800/50 rounded-lg transition-all duration-200`}>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.muted}`} />
            <input
              id="cheatsheet-search"
              type="text"
              placeholder="Search cheatsheet... (Press / to focus)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${themeClasses.input} border rounded-lg pl-10 pr-4 py-2.5 focus:border-cyan-500 focus:outline-none transition-all duration-200 text-sm`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.text.muted} hover:${themeClasses.text.primary} transition-colors duration-200`}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Results Info */}
        {debouncedSearchTerm && (
          <div className={`mb-6 p-3 ${themeClasses.section} rounded-lg border`}>
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-cyan-400" />
              <span className={`text-sm ${themeClasses.text.secondary}`}>
                Found {displayedSections.length} section{displayedSections.length !== 1 ? 's' : ''} matching "{debouncedSearchTerm}"
              </span>
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {displayedSections.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        </div>

        {/* No Results */}
        {debouncedSearchTerm && displayedSections.length === 0 && (
          <div className="text-center py-12">
            <div className={`w-16 h-16 ${themeClasses.section} rounded-full flex items-center justify-center mx-auto mb-4 border`}>
              <Search className={`w-6 h-6 ${themeClasses.text.muted}`} />
            </div>
            <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-2`}>No results found</h3>
            <p className={`${themeClasses.text.secondary}`}>
              Try searching for "variables", "loops", "classes", or "methods"
            </p>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-12 pt-8 border-t ${themeClasses.border}`}>
          <div className={`${themeClasses.section} rounded-lg p-6 border`}>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>Quick Tips</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className={`flex items-start space-x-2 ${themeClasses.text.secondary}`}>
                <kbd className={`px-1.5 py-0.5 text-xs ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'} rounded border`}>/</kbd>
                <span>Focus search</span>
              </div>
              <div className={`flex items-start space-x-2 ${themeClasses.text.secondary}`}>
                <kbd className={`px-1.5 py-0.5 text-xs ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'} rounded border`}>ESC</kbd>
                <span>Clear search</span>
              </div>
              <div className={`flex items-start space-x-2 ${themeClasses.text.secondary}`}>
                <span className="text-cyan-400">Click</span>
                <span>section headers to collapse/expand</span>
              </div>
              <div className={`flex items-start space-x-2 ${themeClasses.text.secondary}`}>
                <span className="text-purple-400">Copy</span>
                <span>button on each code block</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCheatsheet;