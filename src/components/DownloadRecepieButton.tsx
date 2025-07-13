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
    <button onClick={handleDownload}>
      Download Recipe
    </button>
  );
};

export default DownloadRecipeButton;
