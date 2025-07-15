import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../../api/recipes';
import { Recipe } from '../../types/recipe';
import ExpandableSection from '../ExpandableSection';
import './styles.css';

// TheMealDB API provides up to 20 ingredients per meal.
const MAX_INGREDIENTS = 20;

type RecipeListProps = {
  searchQuery: string;
  country?: string;
};

const RecipeList: React.FC<RecipeListProps> = ({searchQuery, country}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const processRecipes = (data: any): Recipe[] => {
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
                country: item.strArea || '',
            };
        });
    };

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes(searchQuery);
                const processedData = await processRecipes(data);
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

    // Filter recipes by country after fetching
    const filteredRecipes = country
        ? recipes.filter(recipe => recipe.country === country)
        : recipes;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || filteredRecipes.length === 0) {
        return (
            <div className="warning-box">
                <span className="warning-icon">⚠️</span>
                Could not find any recipes
            </div>
        );
    }

    return (
        <div>
            <h2>Recipe List</h2>
            <div>
            {filteredRecipes.map((recipe) => (
                <div key={recipe.id} style={{ marginBottom: '1rem' }}>
                    <ExpandableSection title={recipe.title} recipe={recipe}>
                        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                            <strong>Ingredients:</strong>
                            {recipe.ingredients.map((ing, idx) => (
                                <li key={idx}>
                                    {ing.name} {ing.measure && `- ${ing.measure}`}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <strong>Instructions:</strong>
                            {recipe.instructions
                                .split('\n')
                                .filter(step => step.trim() !== '')
                                .map((step, idx) => {
                                    // Remove leading "Step n:", "n.", or "Step n." from each step
                                    const cleanedStep = step.replace(/^(\s*(Step\s*\d+:?|\d+\.)\s*)/i, '');
                                    return (
                                        <p key={idx} style={{ marginBottom: '1em' }}>
                                            <strong>Step {idx + 1}:</strong> {cleanedStep}
                                        </p>
                                    );
                                })
                            }
                        </div>
                    </ExpandableSection>
                </div>
            ))}
            </div>
        </div>
    );
};

export default RecipeList;