import { CodeBlock, ParsedSection } from '../types/cheatsheet';

// Pre-process the cheatsheet content at module level for instant access
export function parseCheatsheetContent(content: string): ParsedSection[] {
  if (!content) return [];
  
  try {
    const sections = content.split(/^## /gm).filter(Boolean);
    
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#+\s*/, '');
      const content = lines.slice(1).join('\n');
      const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      // Extract code blocks with limit for performance
      const codeBlocks: CodeBlock[] = [];
      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      let match;
      let blockIndex = 0;
      
      while ((match = codeBlockRegex.exec(content)) !== null && blockIndex < 8) {
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
        content: content.replace(/```[\s\S]*?```/g, ''), // Remove code blocks from searchable content
        codeBlocks
      };
    });
  } catch (error) {
    console.error('Error parsing cheatsheet content:', error);
    return [];
  }
}

// Create search index for faster searching
export function createSearchIndex(sections: ParsedSection[]) {
  return sections.map(section => ({
    ...section,
    searchableText: `${section.title} ${section.content}`.toLowerCase(),
    keywords: section.title.toLowerCase().split(/\s+/).concat(
      section.content.toLowerCase().match(/\b\w{3,}\b/g) || []
    )
  }));
}