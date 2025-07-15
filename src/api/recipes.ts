// filepath: food-finder/src/api/recipes.ts
import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const AREA_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FILTER_BY_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const fetchRecipes = async (search: string, area?: string): Promise<any> => {
    try {
        let url = API_URL + encodeURIComponent(search);
        if (area && area !== '') {
            url = FILTER_BY_AREA_URL + encodeURIComponent(area);
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCountries = async (): Promise<string[]> => {
    const response = await axios.get(AREA_URL);
    return response.data.meals.map((item: any) => item.strArea);
};