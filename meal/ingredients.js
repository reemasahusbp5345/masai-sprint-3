window.addEventListener('load',()=>{
    var ingredientsImage=document.getElementById('imgValue');
   
    var imgValue= JSON.parse(localStorage.getItem( 'imgValue'));
    console.log(imgValue)

    ingredientsImage.setAttribute('src',imgValue)

    var ingredient=JSON.parse(localStorage.getItem('Ingredient'));
    console.log(ingredient)

    loadData(ingredient)
})

function loadData(ingredient){
    var card=document.querySelector('.card');
   card.innerHTML="";
   var div=document.createDocumentFragment();
   for(var i=0; i<ingredient.drinks.length; i++){
        var drinks=createCard(ingredient.drinks[i]);
        
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
    
    card.setAttribute('class','card m-3 p-2 col-3')
    
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