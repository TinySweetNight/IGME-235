// Reloading when a button is clicked
const buttons = document.querySelectorAll(".button");
window.onload = (e) => { buttons.forEach((button) => { button.onclick = buttonClicked }) }

//Sound
let clickSound = new sound("media/148076__timkahn__foam-pluck-03.wav");

let backgroundMusic = new sound("media/431330__joshuaempyre__orchestra-lurking-cue.wav");




//Stage Enums
class Stage {
    static 1 = new Stage('1');
    static 2 = new Stage('2');
    static 3 = new Stage('3');
    static 4 = new Stage('4');
    static 5 = new Stage('5');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Stage.${this.name}`;
    }

}




//Stage saving
//Local storage for stage
let stage;

const prefix = "lwr3476-";

const stageKey = prefix + "stage";

const storedStage = localStorage.getItem(stageKey);

console.log(storedStage);

if (storedStage) {
    stage = storedStage;
}
else {
    stage = Stage[1].name;
}


//Value of wrong answers
//Setting up the local storage for wrong answers
let wrongAnswer;

const wrongKey = prefix + "wrong";

const storedWrong = localStorage.getItem(wrongKey);

if (storedWrong) {
    wrongAnswer = storedWrong;
}
else {
    wrongAnswer = 0;
}





  //button number 1 is the wrong answer button
  document.getElementById("button1").addEventListener("click",wrong);

  //Function for wrong answers
   function wrong()
   {
     wrongAnswer++;
   }

//Rendering the Stage
renderStage();


// When the a button is clicked, run the necessary code for changing the outcome of the stage
function buttonClicked() {

    //Play button sound
    clickSound.play();

    //Stage 1
    if (stage === Stage[1].name) {

        //Play background track
        backgroundMusic.play();

       //Change the Stage
        stage = Stage[2].name;

    }

    //Stage 2
    else if (stage === Stage[2].name) {

        //Change the Stage
        stage = Stage[3].name;

    }

    //Stage 3
    else if (stage === Stage[3].name) {
      
       //Checking at the end if the wrong answers were totaled. 
        if( wrongAnswer > 0)
        {
             //Change the Stage
             stage = Stage[4].name;
        }
        else
        {
            //Change the Stage
            stage = Stage[5].name;
        }

        //Hide button
        document.getElementById('button1').style.display = "none";
    }



    //Win and Die because they have the same underlining code
    else if (stage === Stage[4].name || stage === Stage[5].name) {

        //Change Stage
        stage = Stage[1].name;

        //Reset value
        wrongAnswer = 0;

        //Unhide button
        document.getElementById('button1').style.display = "inline-block";
    }



    //Render the stage
    renderStage();


    //Saving
    localStorage.setItem(stageKey, stage);
    localStorage.setItem(wrongKey, wrongAnswer);

}


//Rendering visual aspects of the stage
function renderStage()
{

    //Set Fae image
    let fae = document.querySelector("#fae");
    let background = document.querySelector("#background");

    let faeSpeak = document.querySelector("p");
    let button1 = document.getElementById('button1');
    let button2 = document.getElementById('button2');


        //Stage 1
        if (stage === Stage[1].name) {

            //Return fae
            fae.style.display = "inline-block";
            faeSpeak.style.fontSize = "1em";
            faeSpeak.style.color = "#D7CE97";

              //Change background
              background.src ="media/background.jpg";

  

            //Change Fae image
            fae.src = "media/stage_1.PNG";

            //Fae Speak
            faeSpeak.innerHTML = "'Hello wanderer, may I have the pleasure of having your name?'";

            //Button changing
            button1.innerHTML = "(Say Name)";
            button2.innerHTML = "(Say Nothing)";
    
        }
    
        //Stage 2
        else if (stage === Stage[2].name) {
    
            //Change Fae image
            fae.src = "media/stage_2.PNG";

               //Fae Speak
               faeSpeak.innerHTML = "'Well! I'm just about to head to a picnic, I'll save you some food if you come along.'";

               //Button changing
               button2.innerHTML = "(Decline)";
               button1.innerHTML = "(Accept)";
       
    
        }
    
        //Stage 3
        else if (stage === Stage[3].name) {
            //Change Fae image
            fae.src = "media/stage_3.PNG";

            //Fae Speak
            faeSpeak.innerHTML = "'What a wonderful talk. May the moss guide your way.'";

            //Button changing
            button1.innerHTML = "(Say thank you)";
            button2.innerHTML = "(Be on your way)";
    
    
        }
    
    
        //Death
        else if (stage === Stage[4].name) {
            //vanishing Fae
            fae.style.display = "none";

            //Change background
            background.src ="media/badEnd.jpg";

            //Fae Speak
            faeSpeak.style.fontSize = "1.5em";
            faeSpeak.style.color = "#7C1011";
            faeSpeak.innerHTML = `${wrongAnswer} of 3 incorrect`;

            //Button change
            button2.innerHTML = "Try again?";

        }
    
        //Win
        else if (stage === Stage[5].name) {
            fae.style.display = "none";


            //Fae Speak
            faeSpeak.style.fontSize = "1.5em";
            faeSpeak.innerHTML = "You Survived!";

              //Button change
              button2.innerHTML = "Play again?";

        }

    
}

//Implimenting Sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}





