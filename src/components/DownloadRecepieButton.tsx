import React from 'react';

type Ingredient = {
  name: string;
  measure?: string;
};

type DownloadRecipeButtonProps = {
  recipe: {
    title: string;
    ingredients: Ingredient[];
    instructions: string;
  };
};

const DownloadRecipeButton: React.FC<DownloadRecipeButtonProps> = ({ recipe }) => {
  const handleDownload = () => {
    const content = `
${recipe.title}

Ingredients:
${recipe.ingredients
  .map((ing) => `- ${ing.name}${ing.measure ? `: ${ing.measure}` : ''}`)
  .join('\n')}

Instructions:
${recipe.instructions}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${recipe.title.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5em',
        padding: '0.6rem 1.2rem',
        borderRadius: '999px',
        border: 'none',
        background: 'linear-gradient(90deg, #e0e0e0 0%, #b0b0b0 50%, #888 100%)',
        color: '#333',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.2s',
      }}
    >
      <span className="material-icons" style={{ fontSize: '1.2em' }}>download</span>
      Download Recipe
    </button>
  );
};

export default DownloadRecipeButton;
