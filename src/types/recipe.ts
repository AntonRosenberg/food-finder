export interface Recipe {
    id: number;
    title: string;
    ingredients: { name: string; measure: string }[];
    instructions: string;
    country: string;
}