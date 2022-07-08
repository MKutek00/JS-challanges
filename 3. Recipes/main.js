const randomMealContainer = document.querySelector(".meals");
const favoriteMealContainer = document.getElementById("fav-meals");
const popupContainer = document.querySelector("#meal-popup");

getRandomMeal();
renderFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    ).then(response =>{
        return response.json();
    });
    addRandomMeal(resp.meals[0], true);
}

async function getMealById(id) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    ).then(response =>{
        return response.json();
    });

    return resp.meals[0];
}

function showPopupMeal(){

    const newPopupMeal = document.createElement("div");
    newPopupMeal.classList.add("popup");

    newPopupMeal.innerHTML = `
        <button id="close-popup" class="close-popup">
        <i class="fas fa-times"></i>
        </button>
        <div class="meal-info" id="meal-info"></div>
        `;

}

function addRandomMeal(mealData, random = false) {
    console.log(mealData);

    const newRandomMeal = document.createElement("div");
    newRandomMeal.classList.add("meal");

    newRandomMeal.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `
            <span class="random"> Random Recipe </span>`
                    : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    randomMealContainer.appendChild(newRandomMeal);
    
    listenNewFavMeal(mealData);

}

function listenNewFavMeal(mealData){
    document.querySelector(".meal-body .fav-btn").addEventListener('click', (e)=>{
        if(e.target.classList.contains("active")){
            e.target.classList.remove("active");
            removeFavMealLS(mealData);
        }else{
            e.target.classList.add("active");
            addFavMealLS(mealData);
        }
        renderFavMeals();

    });
}

async function renderFavMeals() {
    favoriteMealContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addFavMeal(meal);
    }
}

function addFavMeal(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    favoriteMealContainer.appendChild(favMeal);

    const deleteFavMeal = favMeal.querySelector(".clear");

    deleteFavMeal.addEventListener("click", () => {
        removeFavMealLS(mealData);
        renderFavMeals();
    });
    favMeal.addEventListener("click", () => {
        
    });
    


}


function removeFavMealLS(meal) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== meal.idMeal))
    );
}

function addFavMealLS(meal) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, meal.idMeal]));

}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}
