import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, FileText, Code, Layers, ArrowRight, Clock, Hash } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import cheatsheetContent from '../content/java-cheatsheet.md?raw';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'documentation' | 'cheatsheet' | 'assignment' | 'code';
  category: string;
  url: string;
  icon: React.ReactNode;
  relevance: number;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { settings } = useSettings();
  const navigate = useNavigate();

  // Create searchable content index
  const searchIndex = useMemo(() => {
    const index: SearchResult[] = [];

    // Documentation content
    const docSections = [
      {
        id: 'intro',
        title: 'Introduction to Java',
        content: 'Object-oriented programming using Java course introduction, fundamentals, syntax, variables, methods',
        category: 'Getting Started',
        url: '/documentation'
      },
      {
        id: 'encapsulation',
        title: 'Encapsulation',
        content: 'Data hiding, access control, private variables, getter setter methods, class design principles',
        category: 'Core Concepts',
        url: '/documentation'
      },
      {
        id: 'inheritance',
        title: 'Inheritance',
        content: 'Extends keyword, parent child classes, super keyword, method overriding, polymorphism',
        category: 'Core Concepts',
        url: '/documentation'
      },
      {
        id: 'polymorphism',
        title: 'Polymorphism',
        content: 'Method overloading, method overriding, runtime polymorphism, dynamic binding, interfaces',
        category: 'Core Concepts',
        url: '/documentation'
      },
      {
        id: 'design-patterns',
        title: 'Design Patterns',
        content: 'Singleton pattern, factory pattern, observer pattern, builder pattern, MVC architecture',
        category: 'Advanced Topics',
        url: '/documentation'
      },
      {
        id: 'collections',
        title: 'Collections Framework',
        content: 'ArrayList, HashMap, HashSet, LinkedList, Iterator, generics, data structures',
        category: 'Advanced Topics',
        url: '/documentation'
      },
      {
        id: 'exception-handling',
        title: 'Exception Handling',
        content: 'Try catch finally, throw throws, custom exceptions, checked unchecked exceptions',
        category: 'Advanced Topics',
        url: '/documentation'
      }
    ];

    docSections.forEach(section => {
      index.push({
        ...section,
        type: 'documentation',
        icon: <BookOpen className="w-4 h-4" />,
        relevance: 0
      });
    });

    // Assignment content
    const assignments = [
      {
        id: 'helloworld',
        title: 'HelloWorld Assignment',
        content: 'Basic Java program structure, main method, System.out.println, first program, beginner',
        category: 'Fundamentals',
        url: '/components'
      },
      {
        id: 'student-class',
        title: 'Student Class',
        content: 'Class definition, constructor, instance variables, methods, object creation, encapsulation',
        category: 'Classes',
        url: '/components'
      },
      {
        id: 'calculator',
        title: 'Calculator',
        content: 'Static methods, arithmetic operations, method parameters, return values, math functions',
        category: 'Methods',
        url: '/components'
      },
      {
        id: 'bank-account',
        title: 'Bank Account',
        content: 'Advanced class design, deposit withdraw methods, balance tracking, validation, business logic',
        category: 'Classes',
        url: '/components'
      }
    ];

    assignments.forEach(assignment => {
      index.push({
        ...assignment,
        type: 'assignment',
        icon: <Layers className="w-4 h-4" />,
        relevance: 0
      });
    });

    // Parse cheatsheet content
    const cheatsheetSections = cheatsheetContent.split('\n## ').slice(1);
    cheatsheetSections.forEach((section, idx) => {
      const lines = section.split('\n');
      const title = lines[0];
      const content = lines.slice(1, 10).join(' ').replace(/[#`*]/g, '');
      
      index.push({
        id: `cheat-${idx}`,
        title: title,
        content: content,
        type: 'cheatsheet',
        category: 'Reference',
        url: '/cheatsheet',
        icon: <FileText className="w-4 h-4" />,
        relevance: 0
      });
    });

    // Code examples
    const codeExamples = [
      {
        id: 'java-syntax',
        title: 'Java Syntax Examples',
        content: 'Variables, data types, operators, control structures, loops, conditionals, syntax',
        category: 'Syntax',
        url: '/code'
      },
      {
        id: 'oop-examples',
        title: 'OOP Code Examples',
        content: 'Class examples, inheritance examples, polymorphism code, interface implementation',
        category: 'Object-Oriented',
        url: '/code'
      }
    ];

    codeExamples.forEach(example => {
      index.push({
        ...example,
        type: 'code',
        icon: <Code className="w-4 h-4" />,
        relevance: 0
      });
    });

    return index;
  }, []);

  // Search function with relevance scoring
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    const words = queryLower.split(' ').filter(word => word.length > 0);

    return searchIndex
      .map(item => {
        let relevance = 0;
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();
        const categoryLower = item.category.toLowerCase();

        // Title exact match (highest priority)
        if (titleLower.includes(queryLower)) {
          relevance += 100;
        }

        // Title word matches
        words.forEach(word => {
          if (titleLower.includes(word)) {
            relevance += 50;
          }
        });

        // Category matches
        if (categoryLower.includes(queryLower)) {
          relevance += 30;
        }

        // Content matches
        words.forEach(word => {
          const contentMatches = (contentLower.match(new RegExp(word, 'g')) || []).length;
          relevance += contentMatches * 10;
        });

        return { ...item, relevance };
      })
      .filter(item => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8); // Limit to top 8 results
  }, [query, searchIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));

    // Navigate to result
    navigate(result.url);
    onClose();
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Dynamic theme classes
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        overlay: 'bg-black/60',
        modal: 'bg-white border-gray-200',
        input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        result: {
          default: 'hover:bg-gray-50 border-gray-100',
          selected: 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20'
        },
        section: 'bg-gray-50 border-gray-200'
      };
    }
    return {
      overlay: 'bg-black/80',
      modal: 'bg-black border-gray-800',
      input: 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      result: {
        default: 'hover:bg-gray-900/50 border-gray-800',
        selected: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30'
      },
      section: 'bg-gray-900/50 border-gray-700'
    };
  };

  const themeClasses = getThemeClasses();

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${themeClasses.overlay} backdrop-blur-sm z-[10001] flex items-start justify-center pt-20`}>
      <div className={`${themeClasses.modal} rounded-xl w-full max-w-2xl mx-4 border shadow-2xl overflow-hidden`}>
        {/* Animated gradient border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search documentation, assignments, and cheatsheets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full text-lg ${themeClasses.input} border rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all duration-300`}
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className={`p-2 ${themeClasses.text.secondary} hover:${themeClasses.text.primary} hover:bg-gray-800/50 rounded-lg transition-all duration-300`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() ? (
            // Search Results
            <div className="p-4">
              {searchResults.length > 0 ? (
                <>
                  <div className={`text-xs ${themeClasses.text.muted} uppercase tracking-widest font-semibold mb-4 px-2`}>
                    {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''} for "{query}"
                  </div>
                  <div className="space-y-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                          index === selectedIndex 
                            ? themeClasses.result.selected 
                            : themeClasses.result.default
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-md transition-all duration-300 ${
                            index === selectedIndex 
                              ? 'bg-cyan-500/20 text-cyan-400' 
                              : `${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800/50'} ${themeClasses.text.secondary}`
                          }`}>
                            {result.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`font-semibold ${themeClasses.text.primary} group-hover:text-cyan-400 transition-colors duration-300`}>
                                {result.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-md ${
                                  result.type === 'documentation' ? 'bg-blue-500/20 text-blue-400' :
                                  result.type === 'assignment' ? 'bg-green-500/20 text-green-400' :
                                  result.type === 'cheatsheet' ? 'bg-purple-500/20 text-purple-400' :
                                  'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {result.type}
                                </span>
                                <ArrowRight className={`w-3 h-3 ${themeClasses.text.muted} group-hover:text-cyan-400 transition-all duration-300 ${
                                  index === selectedIndex ? 'translate-x-1' : ''
                                }`} />
                              </div>
                            </div>
                            <p className={`text-sm ${themeClasses.text.secondary} line-clamp-2`}>
                              {result.content}
                            </p>
                            <div className={`text-xs ${themeClasses.text.muted} mt-1`}>
                              {result.category}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 ${themeClasses.section} rounded-full flex items-center justify-center mx-auto mb-4 border`}>
                    <Search className={`w-6 h-6 ${themeClasses.text.muted}`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-2`}>No results found</h3>
                  <p className={`${themeClasses.text.secondary}`}>
                    Try searching for "java", "class", "method", or "assignment"
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Recent Searches & Quick Links
            <div className="p-4 space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-xs ${themeClasses.text.muted} uppercase tracking-widest font-semibold`}>
                      Recent Searches
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className={`text-xs ${themeClasses.text.secondary} hover:${themeClasses.text.primary} transition-colors duration-300`}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg ${themeClasses.result.default} transition-all duration-300 group`}
                      >
                        <Clock className={`w-4 h-4 ${themeClasses.text.muted} group-hover:text-cyan-400 transition-colors duration-300`} />
                        <span className={`${themeClasses.text.secondary} group-hover:${themeClasses.text.primary} transition-colors duration-300`}>
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div>
                <div className={`text-xs ${themeClasses.text.muted} uppercase tracking-widest font-semibold mb-4`}>
                  Quick Links
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setQuery('java basics'); }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.result.default} transition-all duration-300 group`}
                  >
                    <Hash className={`w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`text-sm ${themeClasses.text.secondary} group-hover:${themeClasses.text.primary} transition-colors duration-300`}>
                      Java Basics
                    </span>
                  </button>
                  <button
                    onClick={() => { setQuery('oop concepts'); }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.result.default} transition-all duration-300 group`}
                  >
                    <Hash className={`w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`text-sm ${themeClasses.text.secondary} group-hover:${themeClasses.text.primary} transition-colors duration-300`}>
                      OOP Concepts
                    </span>
                  </button>
                  <button
                    onClick={() => { setQuery('assignments'); }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.result.default} transition-all duration-300 group`}
                  >
                    <Hash className={`w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`text-sm ${themeClasses.text.secondary} group-hover:${themeClasses.text.primary} transition-colors duration-300`}>
                      Assignments
                    </span>
                  </button>
                  <button
                    onClick={() => { setQuery('cheatsheet'); }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.result.default} transition-all duration-300 group`}
                  >
                    <Hash className={`w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`text-sm ${themeClasses.text.secondary} group-hover:${themeClasses.text.primary} transition-colors duration-300`}>
                      Cheatsheet
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 ${themeClasses.section} border-t flex items-center justify-between text-xs ${themeClasses.text.muted}`}>
          <div className="flex items-center space-x-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Powered by</span>
            <span className="font-bold text-cyan-400">PRO192 Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;