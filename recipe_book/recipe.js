
let inputBox = document.getElementById("input_box");
let searchButton = document.getElementById("search_button");
let recipeDisplay = document.getElementById("recipe_display");

function searchClick() 
{
    const input = inputBox.value.trim();
    if(input == "")
    {
        alert("Please enter an recipe...");
        return;
    }
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then(api_res => api_res.json())
    .then(info => {
        recipeDisplay.innerHTML = "";
        console.log(info);
        if(info && info.meals)
        {
            const meals = info.meals;
            meals.forEach(meal => 
            {
                const displayRecipe = document.createElement('div');
                displayRecipe.className = "recipe_child";
                displayRecipe.innerHTML = `
                                            <img src = "${meal.strMealThumb}">
                                            <h3> ${meal.strMeal}</h3>
                                            <a class = "details_btn" href = "${meal.strSource || meal.strYoutube}" traget = "blan"> view details </a>
                                            `;
                recipeDisplay.appendChild(displayRecipe);

            });     
        }
        else
        {
            alert("No recipes found with that name. Please try another!");
            return;
        }
        
    })
};