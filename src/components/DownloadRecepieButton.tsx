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
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(90deg,#38c6fa,#4f8cff)',
        color: '#fff',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      Download Recipe
    </button>
  );
};

export default DownloadRecipeButton;
