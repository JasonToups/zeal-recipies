export const FETCH_RECIPE_REQUEST = "FETCH_RECIPE_REQUEST"
export const FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS"
export const FETCH_RECIPE_FAILURE = "FETCH_RECIPE_FAILURE"

const fetchRecipeRequest = () => ({
  type: FETCH_RECIPE_REQUEST,
})

const fetchRecipeSuccess = (payload) => {
  return {
    type: FETCH_RECIPE_SUCCESS,
    payload,
  }
}

const fetchRecipeFailure = (error) => ({
  type: FETCH_RECIPE_FAILURE,
  payload: error,
})

export const executeRecipeFetch = async (id) => {
  const response = await fetch(`/api/recipe/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const recipe = await response.json()
  return recipe
}

export const fetchRecipe = (id) => {
  return async (dispatch) => {
    dispatch(fetchRecipeRequest())
    try {
      const response = await executeRecipeFetch(id)
      dispatch(fetchRecipeSuccess(response))
    } catch (error) {
      dispatch(fetchRecipeFailure(error))
    }
  }
}
