import React, { memo, lazy, Suspense } from 'react';
import { Copy, Check } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

// Lazy load syntax highlighter to avoid blocking initial render
const SyntaxHighlighter = lazy(() => 
  import('react-syntax-highlighter').then(module => ({
    default: module.Prism as any
  }))
);

const oneDark = lazy(() => 
  import('react-syntax-highlighter/dist/esm/styles/prism').then(module => ({
    default: module.oneDark
  }))
);

const oneLight = lazy(() => 
  import('react-syntax-highlighter/dist/esm/styles/prism').then(module => ({
    default: module.oneLight
  }))
);

interface CodeBlockProps {
  id: string;
  language: string;
  code: string;
  title?: string;
  onCopy: (code: string, id: string) => void;
  copiedCode: string | null;
}

const CodeBlock: React.FC<CodeBlockProps> = memo(({ 
  id, 
  language, 
  code, 
  title, 
  onCopy, 
  copiedCode 
}) => {
  const { settings } = useSettings();
  const isDarkMode = settings.theme === 'dark';

  const themeClasses = settings.theme === 'light' 
    ? {
        code: 'bg-gray-50 border-gray-200',
        text: { secondary: 'text-gray-600', muted: 'text-gray-500' }
      }
    : {
        code: 'bg-gray-900/50 border-gray-700',
        text: { secondary: 'text-gray-400', muted: 'text-gray-500' }
      };

  return (
    <div className={`mb-4 last:mb-0 ${themeClasses.code} rounded-lg border overflow-hidden`}>
      {/* Code Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${settings.theme === 'light' ? 'border-gray-200' : 'border-gray-700'} bg-gray-900/20`}>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <span className={`text-xs ${themeClasses.text.muted} font-mono`}>
            {language}
          </span>
        </div>
        
        <button
          onClick={() => onCopy(code, id)}
          className={`flex items-center space-x-1 text-xs ${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-200 group`}
        >
          {copiedCode === id ? (
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
      
      {/* Code Content with Lazy Loading */}
      <div className="overflow-x-auto">
        <Suspense fallback={
          <div className="p-4 text-center">
            <div className={`animate-pulse ${themeClasses.text.secondary}`}>
              Loading syntax highlighting...
            </div>
          </div>
        }>
          <Suspense fallback={<div className="p-4">Loading theme...</div>}>
            <SyntaxHighlighter
              style={isDarkMode ? oneDark : oneLight}
              language={language}
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
              {code}
            </SyntaxHighlighter>
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;