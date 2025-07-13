import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/recipes';
import { Recipe } from '../types/recipe';

const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (err) {
                setError('Failed to fetch recipes');
            } finally {
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Recipe List</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                        <p>Instructions: {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;