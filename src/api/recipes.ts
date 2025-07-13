// filepath: food-finder/src/api/recipes.ts
import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_URL = 'https://api.example.com/recipes'; // Replace with the actual API URL

export const fetchRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};