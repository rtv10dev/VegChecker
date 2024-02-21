import { STATUS } from "./constants";

const getColorByStatus = (status: string) => {
  let color;
  switch (status) {
    case STATUS.vegan:
      color = "success";
      break;
    case STATUS.vegetarian:
      color = "success";
      break;
    case STATUS.maybeVegan:
      color = "warning";
      break;
    case STATUS.maybeVegetarian:
      color = "warning";
      break;
    case STATUS.nonVegan:
      color = "error";
      break;
    case STATUS.nonVegetarian:
      color = "error";
      break;
    case STATUS.veganUnknown:
      color = "info";
      break;
    case STATUS.vegetarianUnknown:
      color = "info";
      break;
    default:
      color = "info";
      break;
  }

  return color;
};

const getAnalysisHeader = (analysis: string) => {
  let header;
  switch (analysis) {
    case STATUS.vegan:
      header = "Vegan";
      break;
    case STATUS.vegetarian:
      header = "Vegetarian";
      break;
    case STATUS.maybeVegan:
      header = "Maybe Vegan";
      break;
    case STATUS.maybeVegetarian:
      header = "Maybe Vegetarian";
      break;
    case STATUS.nonVegan:
      header = "Non Vegan";
      break;
    case STATUS.nonVegetarian:
      header = "Non Vegetarian";
      break;
    case STATUS.veganUnknown:
      header = "Unknown Vegan";
      break;
    case STATUS.vegetarianUnknown:
      header = "Unknown Vegetarian";
      break;
    default:
      header = "Unknown";
      break;
  }
  return header;
};

const getAnalysisIngredients = (analysis: string, ingredients: {}) => {
  const ingredientsList = ingredients[analysis]
    ?.map((ingredient) => {
      const name = ingredient.split(":")[1].replaceAll("-", " ");

      return name[0].toUpperCase() + name.slice(1);
    })
    .join(", ");

  return ingredientsList ?? "";
};

const getAnalysisImage = (analysis: string) => {
  return analysis.includes(STATUS.vegan)
    ? require(`assets/images/leaf.png`)
    : require(`assets/images/bottle.png`);
};

export {
  getAnalysisHeader,
  getAnalysisIngredients,
  getColorByStatus,
  getAnalysisImage,
};
