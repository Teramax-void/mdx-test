export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  title?: string;
}

export interface ParsedSection {
  id: string;
  title: string;
  content: string;
  codeBlocks: CodeBlock[];
}

export interface SearchableSection extends ParsedSection {
  searchableText: string;
  keywords: string[];
}