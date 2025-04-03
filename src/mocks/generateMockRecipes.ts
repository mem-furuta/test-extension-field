interface Recipe {
  id: string;
  name: string;
  tags: string[];
  time: string;
  url: string;
  image: string;
}

function generateMockRecipes(count: number): Recipe[] {
  const recipes: Recipe[] = [];
  const ingredients: string[] = [
    "鶏肉", "豚肉", "牛肉", "魚", "豆腐", "野菜", "卵", "きのこ", "パスタ", "米",
  ];
  const cookingMethods: string[] = [
    "炒め", "焼き", "煮込み", "揚げ", "蒸し", "和え", "マリネ", "ソテー", "グリル", "炊き込み",
  ];
  const seasonings: string[] = [
    "醤油", "味噌", "塩", "胡椒", "砂糖", "みりん", "酒", "酢", "オリーブオイル", "ごま油",
  ];
  const variations: string[] = [
    "風", "仕立て", "煮", "焼き", "炒め", "和え", "風味が美味しい", "で贅沢に", "の香りで", "をじっくり",
  ];
  const images: string[] = [
    "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    "https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png"
  ];

  for (let i = 0; i < count; i++) {
    const id = String(i+1);
    const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    const method = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
    const seasoning = seasonings[Math.floor(Math.random() * seasonings.length)];
    const variation = variations[Math.floor(Math.random() * variations.length)];

    let name = `${ingredient}の${method}`;

    if (Math.random() < 0.7) {
      name += `${seasoning}${variation}`;
    } else {
      name += `${variation}`;
    }

    const tags: string[] = [];
    tags.push(ingredient);
    tags.push(method);
    tags.push(seasoning);

    // const tagCount = Math.floor(Math.random() * 4) + 2; // 2～5個のタグ
    // for (let j = 0; j < tagCount; j++) {
    //   if (Math.random() < 0.5) {
    //     tags.push(ingredients[Math.floor(Math.random() * ingredients.length)]);
    //   } else {
    //     tags.push(cookingMethods[Math.floor(Math.random() * cookingMethods.length)]);
    //   }
    // }

    // 重複を削除
    const uniqueTags = [...new Set(tags)];

    const url = `https://www.google.com/search?q=${tags[0]}`;

    const image = images[Math.floor(Math.random() * images.length)]

    recipes.push({ id, name, tags: uniqueTags, time: `${Math.floor(Math.random() * 60) + 10}分`, url, image});
  }

  return recipes;
}

const mockRecipes = generateMockRecipes(6000);
console.log(JSON.stringify(mockRecipes, null, 2));
//npx ts-node src/mocks/generateMockRecipes.ts > public/mocks/recipes.json