import React, { memo, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { ParsedSection } from '../types/cheatsheet';
import CheatsheetSection from './CheatsheetSection';

interface VirtualizedSectionListProps {
  sections: ParsedSection[];
  searchTerm: string;
  collapsedSections: Set<string>;
  onToggleSection: (sectionId: string) => void;
  onCopyCode: (code: string, id: string) => void;
  copiedCode: string | null;
  containerHeight: number;
}

const VirtualizedSectionList: React.FC<VirtualizedSectionListProps> = memo(({
  sections,
  searchTerm,
  collapsedSections,
  onToggleSection,
  onCopyCode,
  copiedCode,
  containerHeight
}) => {
  const itemHeight = 400; // Estimated height per section

  const SectionRenderer = memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const section = sections[index];
    
    return (
      <div style={style}>
        <CheatsheetSection
          section={section}
          searchTerm={searchTerm}
          isCollapsed={collapsedSections.has(section.id)}
          onToggle={() => onToggleSection(section.id)}
          onCopyCode={onCopyCode}
          copiedCode={copiedCode}
        />
      </div>
    );
  });

  SectionRenderer.displayName = 'SectionRenderer';

  // Only use virtualization for large lists
  if (sections.length < 10) {
    return (
      <div className="space-y-6">
        {sections.map((section) => (
          <CheatsheetSection
            key={section.id}
            section={section}
            searchTerm={searchTerm}
            isCollapsed={collapsedSections.has(section.id)}
            onToggle={() => onToggleSection(section.id)}
            onCopyCode={onCopyCode}
            copiedCode={copiedCode}
          />
        ))}
      </div>
    );
  }

  return (
    <List
      height={containerHeight}
      itemCount={sections.length}
      itemSize={itemHeight}
      overscanCount={2}
    >
      {SectionRenderer}
    </List>
  );
});

VirtualizedSectionList.displayName = 'VirtualizedSectionList';

export default VirtualizedSectionList;