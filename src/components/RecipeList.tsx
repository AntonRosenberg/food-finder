import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/recipes';
import { Recipe } from '../types/recipe';
import ExpandableSection from './ExpandableSection';

// TheMealDB API provides up to 20 ingredients per meal.
const MAX_INGREDIENTS = 20;

type RecipeListProps = {
  searchQuery: string;
};

const RecipeList: React.FC<RecipeListProps> = ({searchQuery}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const processReceipes = (data: any): Recipe[] => {
        return data.meals.map((item: any) => {
            const ingredients: { name: string; measure: string }[] = [];
            for (let i = 1; i <= MAX_INGREDIENTS; i++) {
                const name = item[`strIngredient${i}`];
                let measure = item[`strMeasure${i}`];

                if (measure && measure.toLowerCase().includes('tin')) {
                    measure = measure.replace(/tin/gi, 'package');
                }

                if (name && name.trim() !== '') {
                    ingredients.push({ name, measure: measure || '' });
                }
            }
            return {
                id: Number(item.idMeal),
                title: item.strMeal,
                ingredients,
                instructions: item.strInstructions || '',
            };
        });
    };

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes(searchQuery);
                const processedData = await processReceipes(data);
                setRecipes(processedData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch recipes');
            } finally {
                setLoading(false);
            }
        };

        getRecipes();
    }, [searchQuery]);

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
            {recipes.map((recipe) => (
                <li key={recipe.id}>
                    <ExpandableSection title={recipe.title}>
                    <ul>
                        {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                            {ing.name} {ing.measure && `- ${ing.measure}`}
                        </li>
                        ))}
                    </ul>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    </ExpandableSection>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;