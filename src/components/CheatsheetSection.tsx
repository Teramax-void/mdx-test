import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import { ParsedSection } from '../types/cheatsheet';
import { useSettings } from '../contexts/SettingsContext';
import CodeBlock from './CodeBlock';

interface CheatsheetSectionProps {
  section: ParsedSection;
  searchTerm: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onCopyCode: (code: string, id: string) => void;
  copiedCode: string | null;
}

const CheatsheetSection: React.FC<CheatsheetSectionProps> = memo(({
  section,
  searchTerm,
  isCollapsed,
  onToggle,
  onCopyCode,
  copiedCode
}) => {
  const { settings } = useSettings();

  const themeClasses = settings.theme === 'light' 
    ? {
        section: 'bg-white border-gray-200',
        text: { primary: 'text-gray-900', secondary: 'text-gray-600', muted: 'text-gray-500' }
      }
    : {
        section: 'bg-black/30 border-gray-800',
        text: { primary: 'text-white', secondary: 'text-gray-400', muted: 'text-gray-500' }
      };

  // Optimized highlight function
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim() || highlight.length < 2) return text;
    
    try {
      const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-300/30 text-yellow-600 px-1 rounded">
            {part}
          </mark>
        ) : part
      );
    } catch (error) {
      return text;
    }
  };

  // Memoized markdown components
  const markdownComponents = React.useMemo(() => ({
    h3: ({ children, ...props }: any) => (
      <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-3 mt-6 first:mt-0`} {...props}>
        {typeof children === 'string' ? highlightText(children, searchTerm) : children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className={`text-base font-medium ${themeClasses.text.primary} mb-2 mt-4`} {...props}>
        {typeof children === 'string' ? highlightText(children, searchTerm) : children}
      </h4>
    ),
    p: ({ children, ...props }: any) => (
      <p className={`${themeClasses.text.secondary} leading-relaxed mb-4 text-sm`} {...props}>
        {typeof children === 'string' ? highlightText(children, searchTerm) : children}
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
        <span>{typeof children === 'string' ? highlightText(children, searchTerm) : children}</span>
      </li>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code 
            className={`${settings.theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-900/50 border-gray-700'} text-cyan-400 px-1.5 py-0.5 rounded text-xs font-mono border`}
            {...props}
          >
            {children}
          </code>
        );
      }
      return null;
    },
    pre: () => null,
  }), [themeClasses, searchTerm, settings.theme]);

  return (
    <div className={`${themeClasses.section} rounded-lg border overflow-hidden mb-6`}>
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors duration-200 group"
      >
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-md border border-cyan-500/30 group-hover:scale-105 transition-transform duration-200">
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>
          <h2 className={`text-xl font-bold ${themeClasses.text.primary} text-left`}>
            {typeof section.title === 'string' ? highlightText(section.title, searchTerm) : section.title}
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
          {section.content && (
            <div className="prose prose-sm max-w-none mb-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Code Examples */}
          {section.codeBlocks.map((codeBlock) => (
            <CodeBlock
              key={codeBlock.id}
              id={codeBlock.id}
              language={codeBlock.language}
              code={codeBlock.code}
              title={codeBlock.title}
              onCopy={onCopyCode}
              copiedCode={copiedCode}
            />
          ))}
        </div>
      )}
    </div>
  );
});

CheatsheetSection.displayName = 'CheatsheetSection';

export default CheatsheetSection;