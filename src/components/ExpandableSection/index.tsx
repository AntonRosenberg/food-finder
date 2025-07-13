import React, { useState } from 'react';
import DownloadRecipeButton from '../DownloadRecepieButton';

type Ingredient = {
  name: string;
  measure?: string;
};

type Recipe = {
  title: string;
  ingredients: Ingredient[];
  instructions: string;
};

type ExpandableSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  recipe?: Recipe; // ✅ Optional prop for recipe download
};

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  recipe,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '1rem 0', padding: '0.5rem' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none',
          border: 'none',
          color: '#007bff',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          padding: 0,
        }}
      >
        {expanded ? '▼' : '►'} {title}
      </button>

      {expanded && (
        <div style={{ marginTop: '0.5rem' }}>
          {children}
          {recipe && (
            <div style={{ marginTop: '1rem' }}>
              <DownloadRecipeButton recipe={recipe} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;
