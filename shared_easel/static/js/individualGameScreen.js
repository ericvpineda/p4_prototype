let currentCorrectAnswer = "H";
let currentCorrectColor = "red";
// $( function() {
//   $( ".dragDomino" ).draggable();
// } );

$('button').click(function () {
    alert('BACKGROUND HAS BEEN CLICKED...')
});



// $("#targetArea").droppable({
//     // activeClass: "active",
//     // hoverClass: "hover",
//     // // drop: function (event, ui) {
//         // // 	$("#dragbox").
//         // // }
//         classes: {
//             //"ui-droppable-active": "ui-state-active",
//             "ui-droppable-hover": "ui-state-hover"
//         },
//         accept: ".dragDomino",
//         activeClass: "ui-state-highlight",
//         over: function( event, ui ) {
//             // over droppable        
//             console.log('over');
//             let id = $(ui.draggable).attr('id')
//             let queryString = "#" + id + " > p:nth-child(2)"  
            
//             if (checkAnswer(queryString)){
//                 ui.helper
//                     .addClass("ui-over")
//                     .addClass($(this).attr('id'))
//                     .addClass('correct')
//             } else {
//                 ui.helper
//                     .addClass("ui-over")
//                     .addClass($(this).attr('id'));
//             }
//         },
//         out: function( event, ui ) {
//             // not over droppable
//             //console.log('out');
            
//             // reset
//             ui.helper
//             .removeClass("ui-over")
//             .removeClass("dropped");
            
//         },
//         drop: function( event, ui ) {
//             // dropped
//             // If this is the wrong answer, return the domino to it's original location
            
            
//             let id = $(ui.draggable).attr('id')
//             console.log(id)
//             let queryString = "#" + id + " > p:nth-child(2)" 

//             //let element = document.querySelector(`$(ui.draggable).attr('id') > div`)
//             //console.log(element)
//             let l = document.querySelector(queryString).textContent;
//             //let c = document.querySelector(queryString).background;
//             //let correct = checkAnswer(document.querySelector(queryString).textContent)
//             if (checkAnswer(queryString)){
//                 updateBigScreen();
//                 updateSmallScreen();
//                 updateCorrectAnswer();
//             }
            
//             // console.log($(this).attr('id'));
//             //console.log('drop');
//             ui.helper
//             .addClass("dropped")
//             .addClass($(this).attr('id'));
//             //$(this).addClass('dropped');
//         },
//     });
//     // });

// function getCorrectAnswer(){
//     return currentCorrectAnswer;
// }

// function updateCorrectAnswer() {
//     // ok yes so I hard coded these values, I should not have done that but oh well
//     switch (letter) {
//         case "H":
//             currentCorrectAnswer = "E";
//             break;
//         case "E":
//             currentCorrectAnswer = "A";
//             break;
//         case "A":
//             currentCorrectAnswer = "R";
//             break;
//         case "R":
//             currentCorrectAnswer = "T";
//             break;
//         case "T":
//             // they have won the game! 
//             break;
//         default:
//             break;
//     }
// }

// function getCorrectColor(){
//     return currentCorrectColor;
// }
// // returns true if the answer is correct, false otherwise
// function checkAnswer(queryString){
    
//     let l = document.querySelector(queryString).textContent;
//     let ca = getCorrectAnswer();
    
//     let cc = getCorrectColor();

//     //console.log("l = " + l+ ", c = "+ c);
//     console.log(", ca = "+ ca + ", cc = "+ cc)
//     if (l == getCorrectAnswer() && cc == getCorrectColor()){
//         console.log("check answer is true")
//     }
//     else{
//         console.log("current correct answer is " + currentCorrectAnswer) 
//         console.log("check answer is false")
//     }
//     // if the document element 
// }
