 window.addEventListener('load',function(){
     fetchData();
 })

 var array=[];

 function fetchData(){
     var data=JSON.parse(localStorage.getItem('drinkData'));
     console.log(data)
     var strDrink=document.getElementById('strDrink');
     strDrink.textContent=data.strDrink;

     var img=document.getElementById('img');
     img.setAttribute('src',data.strDrinkThumb);
     img.setAttribute('alt',data.idDrink);

     var instructions=document.getElementById('instructions');
     instructions.textContent=data.strInstructions 
     
 }

 