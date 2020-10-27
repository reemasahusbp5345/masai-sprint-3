window.onload = ()=>{
    var  drinks = JSON.parse(localStorage.getItem("Browse"))
    // console.log(drinks.drinks);
    browseData(drinks.drinks)
    
   browseDrinks()
}

function browseData(drinks){
    // console.log(drinks)
    var card=document.querySelector('.card');
    card.innerHTML="";
    var div=document.createDocumentFragment();
    for(var i=0; i<drinks.length; i++){
         var drink=createCard(drinks[i]);
         div.append(drink)
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
 