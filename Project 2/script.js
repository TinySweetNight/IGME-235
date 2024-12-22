  // Reloading when button is clocked
  window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};

  //empty Display term
	let number = "";
	
	// When the Search button is clicked
	function searchButtonClicked()
    {
	   console.log("searchButtonClicked() called");
       //Base Triva URL
       const GIPHY_URL = "https://opentdb.com/api.php?";


       //Set the Url
      let url = GIPHY_URL;

       //Get the value for the numbers
      let term = document.querySelector("#number").value;
      displayTerm = term;

     term = term.trim();

     term = encodeURIComponent(term);

     //Check if it's null or it's not a number or greater than 50
     if(term.length < 1 || isNaN(term) || term > 50)
     {
        document.querySelector("#content").innerHTML = "<b>Only Numbers under 50 and above -1 in the search bar</b>";
        return;
     }
       

     url += "amount=" + term;
 
     //Get and translate values from Category
     term = document.querySelector("#category").value;


     if(term != 0)
     {
        url += "&category=" + term;
     }

     //Get and translate values from Difficulty
     term = document.querySelector("#difficulty").value;

     url += "&difficulty=" + term;


     document.querySelector("#content").innerHTML = "Getting Trivia Questions";

     //Post the Url for me to check
     //console.log(url);

     //Get the data
     getData(url);  
    }

    
    //Getting data
    function getData(url){
        
        let xhr = new XMLHttpRequest();

        
        xhr.onload = dataLoaded;

        
        xhr.onerror = dataError;

        
        xhr.open("GET", url);
        xhr.send();
    }

    //Data Loading
    function dataLoaded(e){
        let xhr = e.target;

        console.log(xhr.responseText);

 
        let obj = JSON.parse(xhr.responseText);


        //JUst encase the website throws an error, it will display a message to the screen saying what went wrong
       switch(obj.response_code)
       {
          case 1:
            document.querySelector("#content").innerHTML = "No Results, Try New Category";
            return;

          case 5:
            document.querySelector("#content").innerHTML = "Rate Limit reached, please wait 5 seconds.";
            return;
       }
  


        let results = obj.results;

        let bigString = " ";

        //Displaying answers to the screen by cycling through the arrays in the answer
        for (let i=0;i<results.length;i++){

            let result = results [i];

            //Get the correct answer then cycle through the incorrect to display them
            bigString += results[i].question + "<br> <ul> \n <li>" + results[i].correct_answer + "</li>";

            for(let y=0; y<results[i].incorrect_answers.length; y++)
            {
                bigString += "<li>" + results[i].incorrect_answers[y] + "</li>";

            }

            bigString += "</ul>";

            
        }

            //Change the HTML
            document.querySelector("#content").innerHTML = bigString;

        
    }

    //Just encase
    function dataError(e){
        console.log("An error occurred");
   }




    // Storage
 // declare some constants to save the fields 
   const numberField = document.querySelector("#number");
   const categorySelect = document.querySelector("#category");
   const difficultySelect = document.querySelector("#difficulty");

   const prefix = "lwr3476-"; 

   const numberKey = prefix + "number"
   const categoryKey = prefix + "category";
   const difficultyKey = prefix + "difficulty";

   // grab the stored data
   const storedNumber = localStorage.getItem(numberKey);
   const storedCategory = localStorage.getItem(categoryKey);
   const storedDifficulty = localStorage.getItem(difficultyKey);


// if we find a previously set number value, display it
if (storedNumber){
	numberField.value = storedNumber;
}else{
	numberField.value = "5"; // default value
}

// if we find a previously set category value, display it
if (storedCategory){
	categorySelect.querySelector(`option[value='${storedCategory}']`).selected = true;
}

// if we find a previously set difficulty value, display it
if (storedDifficulty){
	difficultySelect.querySelector(`option[value='${storedDifficulty}']`).selected = true;
}


// when the user changes their favorites, update localStorage
numberField.onchange = e=>{ localStorage.setItem(numberKey, e.target.value); };
categorySelect.onchange = e=>{ localStorage.setItem(categoryKey, e.target.value); };
difficultySelect.onchange = e=>{ localStorage.setItem(difficultyKey, e.target.value); };

