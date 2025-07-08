import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Code, Calculator, CreditCard, User, Copy, Check, Terminal, X, ChevronLeft, Menu } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface CodeExample {
  name: string;
  icon: React.ReactNode;
  active?: boolean;
  code: string;
  description: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const [isCodeExamplesOpen, setIsCodeExamplesOpen] = useState(true);
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { settings } = useSettings();

  // Dynamic theme classes
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        background: 'bg-white',
        border: 'border-gray-200',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        button: {
          hover: 'hover:bg-gray-100',
          active: 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-gray-900 border-cyan-500/20',
          inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        },
        card: 'bg-gray-50 border-gray-200',
        modal: 'bg-white border-gray-200',
        overlay: 'bg-black/60'
      };
    }
    return {
      background: 'bg-black',
      border: 'border-gray-800',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      button: {
        hover: 'hover:bg-gray-900/50',
        active: 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 border-cyan-500/30',
        inactive: 'text-gray-400 hover:text-white hover:bg-gray-900/50'
      },
      card: 'bg-gray-900/50 border-gray-700/50',
      modal: 'bg-black border-gray-800',
      overlay: 'bg-black/80'
    };
  };

  const themeClasses = getThemeClasses();

  const codeExamples: CodeExample[] = [
    { 
      name: 'HelloWorld', 
      icon: <Terminal className="w-4 h-4" />, 
      active: true,
      description: 'Basic Java program structure with main method',
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming!");
    }
}`
    },
    { 
      name: 'Student', 
      icon: <User className="w-4 h-4" />,
      description: 'Student class with properties and methods',
      code: `public class Student {
    private String name;
    private int age;
    private String studentId;
    
    public Student(String name, int age, String studentId) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Student ID: " + studentId);
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}`
    },
    { 
      name: 'Calculator', 
      icon: <Calculator className="w-4 h-4" />,
      description: 'Simple calculator with basic arithmetic operations',
      code: `public class Calculator {
    public static double add(double a, double b) {
        return a + b;
    }
    
    public static double subtract(double a, double b) {
        return a - b;
    }
    
    public static double multiply(double a, double b) {
        return a * b;
    }
    
    public static double divide(double a, double b) {
        if (b != 0) {
            return a / b;
        } else {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("5 + 3 = " + add(5, 3));
        System.out.println("5 - 3 = " + subtract(5, 3));
        System.out.println("5 * 3 = " + multiply(5, 3));
        System.out.println("5 / 3 = " + divide(5, 3));
    }
}`
    },
    { 
      name: 'BankAccount', 
      icon: <CreditCard className="w-4 h-4" />,
      description: 'Bank account class with deposit and withdrawal methods',
      code: `public class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;
    
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
            System.out.println("New balance: $" + balance);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            System.out.println("New balance: $" + balance);
        } else {
            System.out.println("Insufficient funds or invalid amount");
        }
    }
    
    public double getBalance() {
        return balance;
    }
}`
    },
  ];

  const handleCopyCode = async (code: string, exampleName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(exampleName);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const openCodeModal = (example: CodeExample) => {
    setSelectedExample(example);
  };

  const closeCodeModal = () => {
    setSelectedExample(null);
    setCopiedCode(null);
  };

  return (
    <>
      <div className={`${themeClasses.background} ${themeClasses.border} h-full overflow-y-auto relative transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-gray-900/20 pointer-events-none"></div>
        
        {/* Collapse Toggle Button */}
        <div className={`absolute top-3 z-20 ${isCollapsed ? 'left-1/2 transform -translate-x-1/2' : 'right-3'}`}>
          <button
            onClick={onToggleCollapse}
            className={`p-2 ${themeClasses.text.secondary} hover:text-cyan-400 ${themeClasses.button.hover} rounded-md transition-all duration-300 group border border-transparent hover:${themeClasses.border}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
        
        {/* Collapsed State */}
        {isCollapsed && (
          <div className="relative pt-14 px-1 space-y-3 flex flex-col items-center">
            {/* Collapsed Navigation Icons */}
            <div className="space-y-3 flex flex-col items-center w-full">
              <div className={`p-2 ${themeClasses.text.secondary} hover:text-cyan-400 ${themeClasses.button.hover} rounded-lg transition-all duration-300 cursor-pointer group w-8 h-8 flex items-center justify-center`} title="Learning">
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className={`p-2 text-cyan-400 ${themeClasses.active} rounded-lg cursor-pointer group w-8 h-8 flex items-center justify-center`} title="Code Editor">
                <Code className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            
            <div className={`w-6 h-px ${themeClasses.border} my-2`}></div>
            
            {/* Collapsed Code Examples */}
            <div className="space-y-3 flex flex-col items-center w-full">
              {codeExamples.map((example, index) => (
                <button
                  key={example.name}
                  onClick={() => openCodeModal(example)}
                  className={`p-2 rounded-lg transition-all duration-300 group w-8 h-8 flex items-center justify-center ${
                    example.active
                      ? `${themeClasses.button.active} shadow-lg shadow-cyan-500/10`
                      : `${themeClasses.text.secondary} ${themeClasses.button.hover} border border-transparent hover:${themeClasses.border}`
                  }`}
                  title={example.name}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {example.icon}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Expanded State */}
        {!isCollapsed && (
          <div className="relative p-6 pt-14">
            {/* Navigation Section */}
            <div className="mb-8">
              <button
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}
                className={`flex items-center justify-between w-full ${themeClasses.text.primary} font-medium mb-4 hover:text-cyan-400 transition-all duration-300 group`}
              >
                <span className="text-sm tracking-widest font-semibold">NAVIGATION</span>
                <div className={`p-1 rounded-md group-hover:${themeClasses.button.hover} transition-all duration-300`}>
                  {isNavigationOpen ? 
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" /> : 
                    <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                  }
                </div>
              </button>
              
              {isNavigationOpen && (
                <div className="space-y-2">
                  <a href="#" className={`flex items-center space-x-3 ${themeClasses.text.secondary} ${themeClasses.text.primary} ${themeClasses.button.hover} px-4 py-3 rounded-lg transition-all duration-300 group border border-transparent hover:${themeClasses.border}`}>
                    <BookOpen className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span className="text-sm font-medium">Learning</span>
                  </a>
                  <a href="#" className={`flex items-center space-x-3 text-cyan-400 ${themeClasses.button.active} px-4 py-3 rounded-lg relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Code className="w-4 h-4 relative z-10" />
                    <span className="text-sm font-medium relative z-10">Code Editor</span>
                  </a>
                </div>
              )}
            </div>

            {/* Code Examples Section */}
            <div>
              <button
                onClick={() => setIsCodeExamplesOpen(!isCodeExamplesOpen)}
                className={`flex items-center justify-between w-full ${themeClasses.text.primary} font-medium mb-4 hover:text-cyan-400 transition-all duration-300 group`}
              >
                <span className="text-sm tracking-widest font-semibold">QUICK TEMPLATES</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-2 py-1 rounded-md text-xs font-bold">
                    {codeExamples.length}
                  </span>
                  <div className={`p-1 rounded-md group-hover:${themeClasses.button.hover} transition-all duration-300`}>
                    {isCodeExamplesOpen ? 
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" /> : 
                      <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                    }
                  </div>
                </div>
              </button>
              
              {isCodeExamplesOpen && (
                <div className="space-y-2">
                  {codeExamples.map((example) => (
                    <button
                      key={example.name}
                      onClick={() => openCodeModal(example)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-300 group border ${
                        example.active
                          ? `${themeClasses.button.active} shadow-lg shadow-cyan-500/10`
                          : `${themeClasses.button.inactive} border-transparent hover:${themeClasses.border}`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded-md transition-all duration-300 ${
                          example.active 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : `${themeClasses.card} group-hover:bg-gray-700/50 group-hover:text-cyan-400`
                        }`}>
                          {example.icon}
                        </div>
                        <span className="text-sm font-medium">{example.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${themeClasses.text.muted} font-medium`}>VIEW</span>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Code Example Modal */}
      {selectedExample && (
        <div className={`fixed inset-0 ${themeClasses.overlay} backdrop-blur-sm z-[99999] flex items-center justify-center p-4`}>
          <div className={`${themeClasses.modal} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative`}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
            
            <div className="relative">
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-6 border-b ${themeClasses.border}`}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                    {selectedExample.icon}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${themeClasses.text.primary} tracking-wide`}>{selectedExample.name}</h3>
                    <p className={`${themeClasses.text.secondary} text-sm tracking-wide`}>{selectedExample.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleCopyCode(selectedExample.code, selectedExample.name)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black px-4 py-2 rounded-lg transition-all duration-300 font-bold tracking-wide border border-cyan-500/50"
                  >
                    {copiedCode === selectedExample.name ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY CODE</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={closeCodeModal}
                    className={`p-2 ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button.hover} rounded-lg transition-all duration-300 border ${themeClasses.border} hover:border-gray-600`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className={`${themeClasses.card} rounded-lg overflow-hidden`}>
                  <div className={`bg-gradient-to-r from-gray-900/80 to-gray-800/80 px-4 py-3 border-b ${themeClasses.border} flex items-center justify-between`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className={`text-sm ${themeClasses.text.secondary} font-mono`}>{selectedExample.name}.java</span>
                    </div>
                    <div className={`flex items-center space-x-2 text-xs ${themeClasses.text.muted}`}>
                      <span>JAVA</span>
                      <div className={`w-1 h-1 ${themeClasses.text.muted} rounded-full`}></div>
                      <span>UTF-8</span>
                    </div>
                  </div>
                  
                  <div className={`p-6 ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-black/30'}`}>
                    <pre className={`text-sm ${themeClasses.text.primary} overflow-x-auto font-mono leading-relaxed`}>
                      <code className="language-java">{selectedExample.code}</code>
                    </pre>
                  </div>
                </div>
                
                {/* Usage Tips */}
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/30">
                  <h4 className={`${themeClasses.text.primary} font-bold mb-2 flex items-center space-x-2`}>
                    <span className="text-cyan-400">💡</span>
                    <span className="tracking-wide">USAGE TIP</span>
                  </h4>
                  <p className={`${themeClasses.text.secondary} text-sm leading-relaxed`}>
                    Copy this code and paste it into the editor above to see it in action. You can modify and experiment with the code to better understand the concepts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;