import React from 'react';
import RecipeList from './components/RecipeList';

const App: React.FC = () => {
    return (
        <div>
            <h1>Food Finder</h1>
            <RecipeList />
        </div>
    );
};

export default App;