export interface Recipe  {
  recipeId: number,
  recipeName: string,
  recipeDescription: string,
  recipeBlurb: string,
  recipeImageUrl: string,
  recipeIngredients: RecipeIngredient[],
  recipeSteps: RecipeStep[]
}

export interface RecipeIngredient {
  recipeId: string,
  ingredientId: number,
  ingredientDescription: string
}

export interface RecipeStep {
  recipeId: string,
  recipeStepId: string,
  recipeStepInstruction: string
}
