import "./styles/styles.css";
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
  const [id, setId] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // mock取得
  useEffect(() => {
    fetch('/test-extension-field/mocks/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, []);

  // Iframe初期化
  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (
        e.isTrusted === true &&
        e.data.action === "MICROCMS_GET_DEFAULT_DATA"
      ) {
        console.log("Iframe初期化");
        setId(e.data.id);
        setSelectedRecipe(e.data.message);
        console.log(e.data);
      }
    });
  }, []);

  // Iframeスタイル変更
  useEffect(() => {
    console.log("Iframeスタイル変更:", selectedRecipe ? 270 : 430);
    window.parent.postMessage(
      {
        id: id,
        action: "MICROCMS_UPDATE_STYLE",
        message: {
          height: selectedRecipe ? 270 : 430,
        },
      },
      origin
    );
  }, [selectedRecipe]);

  // レシピ選択
  const handleSelectRecipe = (selectedRecipe: Recipe | null) => {
    console.log("レシピ選択:", selectedRecipe);
    setSelectedRecipe(selectedRecipe);
    window.parent.postMessage(
      {
        id: id,
        action: "MICROCMS_POST_DATA",
        message: {
          data: selectedRecipe,
        },
      },
      origin
    );
  };

  return <RecipeTable recipes={recipes} selectedRecipe={selectedRecipe} onSelectRecipe={handleSelectRecipe} />;
}
