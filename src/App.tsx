import "./styles/styles.css";
import { useFieldExtension } from "microcms-field-extension-react";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // mock取得
  useEffect(() => {
    fetch('/test-extension-field/mocks/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, []);

  // const { data, sendMessage } = useFieldExtension("#00ff00", { origin });
  // const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
  //   sendMessage({ data: e.target.value });
  // };

  return (
    <div>
      {/* <div>React example</div>
      <input type="color" value={data as string} onChange={onChangeColor} /> */}
      <RecipeTable recipes={recipes} selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />
    </div>
  );
}
