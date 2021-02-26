window.onload = ()=>{
    popularDrinks()
    browseDrinks()
   

    var btn = document.getElementById("btn")
    btn.addEventListener("click", handleClick)
    getCocktailData()
  
    
}

const handleClick=()=>{
var name=document.getElementById('name').value;
console.log(name)

    var xhr = new XMLHttpRequest()
    xhr.open("GET","https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name )
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status == 200){
            var drinks=JSON.parse(xhr.response)
            localStorage.setItem("drinks", xhr.response)
            console.log(drinks)
             location = "page.html"
        }
    }
}

const getCocktailData=()=>{
    var name = document.getElementById("name").value
    var xhr = new XMLHttpRequest()
    xhr.open("GET","https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name)
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status == 200){
            var drinks = (JSON.parse(xhr.response))
            // console.log(res)
            fetchData( drinks)
        }
    }
}

const fetchData = (res)=>{
//    console.log(res.drinks[0].strDrinkThumb)
   var card=document.querySelector('.card');
   card.innerHTML="";
   var div=document.createDocumentFragment();
   for(var i=0; i<res.drinks.length; i++){
        var drinks=createCard(res.drinks[i]);
        
        div.append(drinks)
    }
    card.append(div)
    
}

function getInstructions(){
    location.href="image.html"
}

const createCard = (data) => {
    // console.log(data )
    var card=document.createElement('div')
    
    card.setAttribute('class','card m-3 p-2 col-2')
    
    var image=document.createElement('img');
    image.setAttribute('class','card-img-top')
    image.setAttribute('src',data.strDrinkThumb)
    image.setAttribute('alt',data.idDrink);
    
    
    var cardBody=document.createElement('div');
    cardBody.setAttribute('class','card-body');
    var drink_name=document.createElement('p');
    drink_name.textContent=data.strDrink;
    drink_name.setAttribute('class','card-text')
    
    cardBody.append(drink_name)
    
    card.append(image,  cardBody)
    
    card.addEventListener('click',function(e){
        
        localStorage.setItem('drinkData',JSON.stringify( data))
        getInstructions(e.target)
    })
    return card
}
 
function popularDrinks(){
    var ingredients=document.getElementById('ingredients');
    ingredients.addEventListener('click',function(e){
        var imgValue=e.target.src;
        localStorage.setItem('imgValue',JSON.stringify(imgValue))
        var value=e.target.alt;
        
        // console.log(value)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+value )
        .then(res=> res.json())
        .then(res=> localStorage.setItem('Ingredient',JSON.stringify(res)))
        .then(res=>getIngredientsDetails())
         
    })
}
   
 function getIngredientsDetails(){
     location.href="ingredients.html"
 }

 function browseDrinks(){
     var browse=document.getElementById('browse');
     browse.addEventListener('click',function(e){
       var letter=e.target.textContent;
         fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+letter)
         .then(res => res.json())
         .catch(err=>console.log(err))
         .then(res =>   localStorage.setItem('Browse',JSON.stringify(res)))
         .catch(err1=>console.log(err1))
         .then(res=> location.href="browse.html")
        })
 }
 
