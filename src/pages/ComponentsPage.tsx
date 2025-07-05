import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Code, Calculator, CreditCard, User, Copy, Check, Terminal, X, Target, Zap } from 'lucide-react';

interface CodeExample {
  name: string;
  icon: React.ReactNode;
  active?: boolean;
  code: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const ComponentsPage: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const codeExamples: CodeExample[] = [
    { 
      name: 'HelloWorld', 
      icon: <Terminal className="w-5 h-5" />, 
      active: true,
      difficulty: 'Beginner',
      category: 'Fundamentals',
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
      icon: <User className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Classes',
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
      icon: <Calculator className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Methods',
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
      icon: <CreditCard className="w-5 h-5" />,
      difficulty: 'Advanced',
      category: 'Classes',
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

  const categories = ['All', ...Array.from(new Set(codeExamples.map(example => example.category)))];

  const filteredExamples = selectedCategory === 'All' 
    ? codeExamples 
    : codeExamples.filter(example => example.category === selectedCategory);

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-wide">Assignment Components</h1>
                <p className="text-gray-400 text-lg tracking-wide">Reusable Java code examples and templates</p>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm font-bold text-gray-400 tracking-widest">FILTER BY CATEGORY:</span>
              <div className="flex items-center space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 border ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30'
                        : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example) => (
              <div
                key={example.name}
                className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                onClick={() => openCodeModal(example)}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                        {example.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {example.name}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                          {example.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-md text-xs font-bold tracking-wide border ${getDifficultyColor(example.difficulty)}`}>
                      {example.difficulty}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {example.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Code className="w-3 h-3" />
                      <span>JAVA</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                      <span className="text-xs font-medium tracking-wide">VIEW CODE</span>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse group-hover:bg-cyan-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 bg-black/50 border border-gray-800 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">COMPONENT LIBRARY STATS</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{codeExamples.length}</div>
                  <div className="text-sm text-gray-400 tracking-wide">Total Components</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{categories.length - 1}</div>
                  <div className="text-sm text-gray-400 tracking-wide">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {codeExamples.filter(e => e.difficulty === 'Beginner').length}
                  </div>
                  <div className="text-sm text-gray-400 tracking-wide">Beginner Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                  <div className="text-sm text-gray-400 tracking-wide">Ready to Use</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example Modal */}
      {selectedExample && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
            
            <div className="relative">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                    {selectedExample.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-wide">{selectedExample.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-gray-400 text-sm tracking-wide">{selectedExample.description}</p>
                      <div className={`px-2 py-1 rounded-md text-xs font-bold tracking-wide border ${getDifficultyColor(selectedExample.difficulty)}`}>
                        {selectedExample.difficulty}
                      </div>
                    </div>
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
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 px-4 py-3 border-b border-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">{selectedExample.name}.java</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>JAVA</span>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <span>UTF-8</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-black/30">
                    <pre className="text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
                      <code className="language-java">{selectedExample.code}</code>
                    </pre>
                  </div>
                </div>
                
                {/* Usage Tips */}
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/30">
                  <h4 className="text-white font-bold mb-2 flex items-center space-x-2">
                    <span className="text-cyan-400">💡</span>
                    <span className="tracking-wide">USAGE TIP</span>
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Copy this code and paste it into the editor in the Code section to see it in action. You can modify and experiment with the code to better understand the concepts.
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

export default ComponentsPage;