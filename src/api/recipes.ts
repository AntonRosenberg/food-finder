// filepath: food-finder/src/api/recipes.ts
import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/'; // Replace with the actual API URL

export const fetchRecipes = async (search: string): Promise<Recipe[]> => {
    try {
        const response = await axios.get(API_URL+`${search}`);
        console.log('Fetched recipes:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};