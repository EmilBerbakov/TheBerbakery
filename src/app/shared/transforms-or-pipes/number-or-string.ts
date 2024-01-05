export function numberOrString(recipe: any): string | number | null {
  if (!recipe) {
    return null;
  }
  else if (!isNaN(recipe?.toString())) {
    return Number(recipe);
  }
  else {
    return recipe as string;
  }
}
