import React, { useState, useMemo } from 'react';
import { 
<<<<<<< HEAD
  Search, 
  Copy,
  Check,
  BookOpen,
  Code2,
  Download,
  ExternalLink,
  Filter,
  Hash
=======
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
>>>>>>> 6184c7bed723d7821059a7a869c48235523153c8
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface CheatBlock {
  id: string;
  title: string;
  category: string;
  description: string;
  code: string;
  language: string;
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
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Simple cheat blocks data
  const cheatBlocks: CheatBlock[] = [
    {
      id: 'hello-world',
      title: 'Hello World',
      category: 'Getting Started',
      description: 'Basic Java program structure',
      language: 'java',
      code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    },
    {
      id: 'variables',
      title: 'Variables',
      category: 'Getting Started',
      description: 'Declaring and initializing variables',
      language: 'java',
      code: `int num = 5;
float floatNum = 5.99f;
char letter = 'D';
boolean bool = true;
String site = "quickref.me";`
    },
    {
      id: 'primitive-types',
      title: 'Primitive Data Types',
      category: 'Getting Started',
      description: 'Java primitive data types with sizes and ranges',
      language: 'java',
      code: `byte    // 1 byte  | 0        | -128 to 127
short   // 2 byte  | 0        | -2^15 to 2^15-1
int     // 4 byte  | 0        | -2^31 to 2^31-1
long    // 8 byte  | 0        | -2^63 to 2^63-1
float   // 4 byte  | 0.0f     | N/A
double  // 8 byte  | 0.0d     | N/A
char    // 2 byte  | \\u0000   | 0 to 65535
boolean // N/A     | false    | true / false`
    },
    {
      id: 'strings',
      title: 'Strings',
      category: 'Getting Started',
      description: 'String operations and methods',
      language: 'java',
      code: `String first = "John";
String last = "Doe";
String name = first + " " + last;
System.out.println(name);

// String methods
name.length();        // 8
name.toUpperCase();   // JOHN DOE
name.toLowerCase();   // john doe
name.charAt(0);       // J`
    },
    {
      id: 'arrays',
      title: 'Arrays',
      category: 'Data Structures',
      description: 'Array declaration and initialization',
      language: 'java',
      code: `char[] chars = new char[10];
chars[0] = 'a';
chars[1] = 'b';

char[] chars2 = {'a', 'b', 'c'};
int[] numbers = {1, 2, 3, 4, 5};

// Array length
int length = numbers.length; // 5`
    },
    {
      id: 'loops',
      title: 'Loops',
      category: 'Control Flow',
      description: 'For, while, and do-while loops',
      language: 'java',
      code: `// For loop
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// While loop
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}

// Enhanced for loop
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}`
    },
    {
      id: 'conditionals',
      title: 'Conditionals',
      category: 'Control Flow',
      description: 'If-else statements and switch',
      language: 'java',
      code: `// If-else
int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}

// Switch
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    default: System.out.println("Other");
}`
    },
    {
      id: 'methods',
      title: 'Methods',
      category: 'Functions',
      description: 'Method declaration and usage',
      language: 'java',
      code: `// Method with return value
public static int add(int a, int b) {
    return a + b;
}

// Method without return value
public static void greet(String name) {
    System.out.println("Hello, " + name);
}

// Usage
int result = add(5, 3);  // 8
greet("John");           // Hello, John`
    },
    {
      id: 'classes',
      title: 'Classes',
      category: 'OOP',
      description: 'Class definition with constructor and methods',
      language: 'java',
      code: `public class Person {
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter
    public String getName() {
        return name;
    }
    
    // Method
    public void introduce() {
        System.out.println("Hi, I'm " + name);
    }
}`
    },
    {
      id: 'inheritance',
      title: 'Inheritance',
      category: 'OOP',
      description: 'Class inheritance with extends keyword',
      language: 'java',
      code: `// Parent class
public class Animal {
    protected String name;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class
public class Dog extends Animal {
    public Dog(String name) {
        this.name = name;
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
}`
    },
    {
      id: 'interfaces',
      title: 'Interfaces',
      category: 'OOP',
      description: 'Interface definition and implementation',
      language: 'java',
      code: `// Interface
public interface Drawable {
    void draw();
    default void display() {
        System.out.println("Displaying...");
    }
}

// Implementation
public class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}`
    },
    {
      id: 'exception-handling',
      title: 'Exception Handling',
      category: 'Error Handling',
      description: 'Try-catch-finally blocks',
      language: 'java',
      code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("This always executes");
}

// Throwing exceptions
public void checkAge(int age) throws Exception {
    if (age < 18) {
        throw new Exception("Too young");
    }
}`
    }
  ];

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(cheatBlocks.map(block => block.category)))];

  // Filter blocks based on search and category
  const filteredBlocks = useMemo(() => {
    let filtered = cheatBlocks;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(block => block.category === selectedCategory);
    }

    return filtered;
  }, [selectedCategory, cheatBlocks]);

  // Copy code to clipboard
  const handleCopyCode = async (code: string, id: string) => {
=======
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
>>>>>>> 6184c7bed723d7821059a7a869c48235523153c8
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

<<<<<<< HEAD
  // Theme classes
=======
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
>>>>>>> 6184c7bed723d7821059a7a869c48235523153c8
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
<<<<<<< HEAD
        card: 'bg-white border-gray-200 hover:border-gray-300',
        code: 'bg-gray-100 border-gray-200',
        button: {
          active: 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/25',
          inactive: 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
        },
        header: 'bg-white/95 border-gray-200',
        searchFocus: 'focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
=======
        section: 'bg-white border-gray-200',
        code: 'bg-gray-50 border-gray-200'
>>>>>>> 6184c7bed723d7821059a7a869c48235523153c8
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
<<<<<<< HEAD
      card: 'bg-black/30 border-gray-800 hover:border-gray-700',
      code: 'bg-gray-900/50 border-gray-700',
      button: {
        active: 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/25',
        inactive: 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
      },
      header: 'bg-black/95 border-gray-800',
      searchFocus: 'focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
    };
  }, [settings.theme]);

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      {/* Enhanced Header */}
      <div className={`sticky top-20 z-30 ${themeClasses.header} border-b ${themeClasses.border} backdrop-blur-md`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-transparent to-purple-500/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Filter Section Only */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Filter className={`w-3 h-3 sm:w-4 sm:h-4 ${themeClasses.text.secondary}`} />
              <span className={`text-xs font-semibold ${themeClasses.text.secondary} uppercase tracking-wider`}>
                Filter by Category
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? settings.theme === 'light' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-cyan-500 text-black'
                      : settings.theme === 'light'
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } whitespace-nowrap`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                      selectedCategory === category 
                        ? 'bg-white/20' 
                        : settings.theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'
                    }`}>
                      {cheatBlocks.filter(block => block.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {filteredBlocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBlocks.map((block) => (
              <div
                key={block.id}
                className={`${themeClasses.card} rounded-lg sm:rounded-xl border transition-all duration-200 group overflow-hidden hover:shadow-lg hover:shadow-cyan-500/5`}
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5 border-b border-gray-800/50">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30 flex-shrink-0">
                        <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      </div>
                      <h3 className={`font-bold ${themeClasses.text.primary} group-hover:text-cyan-400 transition-colors duration-200 text-base sm:text-lg truncate`}>
                        {block.title}
                      </h3>
                    </div>
                    <span className="text-xs px-2 sm:px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-medium whitespace-nowrap ml-2">
                      {block.category}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm ${themeClasses.text.secondary} leading-relaxed`}>
                    {block.description}
                  </p>
                </div>

                {/* Code Block */}
                <div className={`${themeClasses.code} relative`}>
                  {/* Code Header */}
                  <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-700/50">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex items-center space-x-1 sm:space-x-1.5">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full"></div>
                      </div>
                      <span className={`text-xs ${themeClasses.text.muted} font-mono font-medium hidden sm:inline`}>
                        {block.language}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleCopyCode(block.code, block.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 text-xs ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-200 group px-2 py-1 rounded-md hover:bg-gray-800/30`}
                    >
                      {copiedCode === block.id ? (
                        <>
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
                          <span className="text-green-400 font-medium hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-3 sm:p-5">
                    <pre className={`text-xs sm:text-sm ${themeClasses.text.primary} overflow-x-auto font-mono leading-relaxed`}>
                      <code>{block.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${themeClasses.card} rounded-full flex items-center justify-center mx-auto mb-6 border shadow-lg`}>
              <Search className={`w-6 h-6 sm:w-8 sm:h-8 ${themeClasses.text.muted}`} />
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold ${themeClasses.text.primary} mb-3`}>No results found</h3>
            <p className={`${themeClasses.text.secondary} text-sm sm:text-base max-w-md mx-auto px-4`}>
              Try adjusting your search terms or category filter to find what you're looking for
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Footer Stats */}
      <div className={`mt-12 sm:mt-20 ${themeClasses.container} border-t ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{cheatBlocks.length}</div>
              <div className={`text-xs sm:text-sm ${themeClasses.text.secondary} font-medium`}>Total Concepts</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{categories.length - 1}</div>
              <div className={`text-xs sm:text-sm ${themeClasses.text.secondary} font-medium`}>Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">100%</div>
              <div className={`text-xs sm:text-sm ${themeClasses.text.secondary} font-medium`}>Ready to Use</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">Fast</div>
              <div className={`text-xs sm:text-sm ${themeClasses.text.secondary} font-medium`}>Loading</div>
=======
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
>>>>>>> 6184c7bed723d7821059a7a869c48235523153c8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCheatsheet;