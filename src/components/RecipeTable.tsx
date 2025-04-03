import React, { useEffect, useState, MouseEvent } from 'react';
import '../styles/RecipeTable.css';
import { Recipe } from '../App';

interface RecipeTableProps {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const RecipeTable: React.FC<RecipeTableProps> = ({ recipes, selectedRecipe, setSelectedRecipe }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const handleSelectRecipe = (recipe: Recipe) => {
    if (!selectedRecipe) {
      setSelectedRecipe(recipe);
    }
  };

  const handleDeselectRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleSearch = () => {
    const text = searchText.toLowerCase();
    const results = recipes.filter(recipe =>
      recipe.id.includes(text) ||
      recipe.name.toLowerCase().includes(text) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(text))
    );
    setFilteredRecipes(results);
  };

  return (
    <div className="recipe-table-container">
      <h2 className="selected-area-title">選択中</h2>
      <div className="selected-area">
        {selectedRecipe ? (
          <div className="selected-recipe-panel">
            <div className="selected-row">
              <div className="selected-cell cell-id">ID: {selectedRecipe.id}</div>
              <div className="selected-cell cell-name">名前: {selectedRecipe.name}</div>
            </div>
            <div className="selected-row">
              <div className="selected-cell cell-image">
                <img src={selectedRecipe.image} alt={selectedRecipe.name} className="selected-thumbnail" />
              </div>
            </div>
            <div className="selected-row">
              <div className="selected-cell cell-tags">タグ: {selectedRecipe.tags.join(', ')}</div>
            </div>
            <button className="deselect-button" onClick={handleDeselectRecipe}>選択解除</button>
          </div>
        ) : (
          <div className="selected-recipe-panel">
            <p className="selected-message">選択されていません</p>
          </div>
        )}
      </div>

      <div className="search-area">
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="レシピを検索"
        />
        <button onClick={handleSearch}>検索</button>
      </div>

      <div className="recipe-table">
        <div className="recipe-table-header">
          <div className="header-select">選択</div>
          <div className="header-id header-sortable">ID</div>
          <div className="header-name header-sortable">名前</div>
          <div className="header-image">画像</div>
          <div className="header-link">リンク</div>
        </div>
        <div className="recipe-table-body">
          {filteredRecipes.map((recipe, index) => (
            <div className="recipe-table-row" key={recipe.id}>
              <div className="recipe-cell cell-select">
                <button
                  className="select-button"
                  onClick={() => handleSelectRecipe(recipe)}
                  disabled={!!selectedRecipe}
                >
                  選択
                </button>
              </div>
              <div className="recipe-cell cell-id">{recipe.id}</div>
              <div
                className="recipe-cell cell-name"
                title={recipe.name}
              >{recipe.name}</div>
              <div className="recipe-cell cell-image">
                <img src={recipe.image} alt={recipe.name} className="recipe-thumbnail" />
              </div>
              <div className="recipe-cell cell-link">
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  開く
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeTable;