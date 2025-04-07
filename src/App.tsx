import "./styles/styles.css";
import { useFieldExtension } from "microcms-field-extension-react";
import { useEffect, useState } from "react";
import RecipeTable from "./components/RecipeTable";

// CHANGEME
// const origin = process.env.REACT_APP_MICROCMS_ORIGIN || "https://example.microcms.io";
const origin = "*";

export interface Recipe {
  id: string;
  name: string;
  tags: string[];
  time: string;
  url: string;
  image: string;
}

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { data, sendMessage } = useFieldExtension<Recipe | null>(null, {
    origin,
    height: 465 // microcms-field-extension-reactを使う場合は高さの変更が不可、id等保持してpostMessageする必要あり
  });

  // mock取得
  useEffect(() => {
    fetch('/test-extension-field/mocks/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, []);

  const handleSelectRecipe = (selectedRecipe: Recipe | null) => {
    sendMessage({ data: selectedRecipe });
  };

  return <RecipeTable recipes={recipes} selectedRecipe={data} onSelectRecipe={handleSelectRecipe} />;
}
