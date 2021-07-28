        // Things to do
        // Drag and drop interaction with the tiles
        // - mobile screen
        //  - 12 tiles (jQuery draggable)
        //          * indicator when over answer box to tell user that they can drop it there
        //
        //  - answer / submission box (jQuery droppable)
        //  - box with running solution 
        // Checking answer
        //  * If incorrect, move tile to original spot
        //  * else build answer on big and little screens
        // if letter is correct, show on all screens
        //  - show puzzle solved with lock, unlocked 
        // write a function that builds the answer (show up on all screens)
        // game setup given players and sockets
        
        // current letter 
        // var x = ?;

    // Game object structures start
    class Riddle {
        // All constructor parameters need to be strings
        constructor( body, author, answer) {
            this.body = body;
            this.author = author;
            this.answer = answer;
        }
    }

    class PuzzlePieces {
        constructor(answerComponent, answerIndex, letter) {
            this.answerComponent = answerComponent;
            this.answerIndex = answerIndex;
            this.letter = letter;
            this.color = getRandomColor();
            //this.domino = getRandomDomino();
            this.greekLetter = getRandomGreekLetter();
        }
        // TODO: code these three
        getRandomColor(){
            var color;
            return color;
        }
        getRandomDomino(){
            var domino;
            return domino;
        }
        getRandomGreekLetter(){
            var greekLetter;
            return greekLetter;
        }
    }

    // These are here to confuse people
    let greekLetters = ["ω", "Θ", "Ξ", "ζ", "ξ", "ψ", "Φ"]
    
    var loc = window.location;
    var wsStart = loc === 'https:' ? 'wss://' : 'ws://'
    var endpoint = wsStart + loc.host + '/ws';
    var socket = new WebSocket(endpoint)
    var params = Object.fromEntries(new URLSearchParams(loc.search))
    
    
    // VARIABLES 
    const $attemptBox = $('.attempt');

    // INPUT FUNCTION 

    function addCharToScreen(char, idx) {
        // const span = document.createElement('span');
        // const space = document.createElement('span');
        // $(span).html(char).css('border-bottom', '2px solid black');
        // $(space).html(" ");
        // $attemptBox.append($(span))
        // $attemptBox.append($(space))
        const idx_int = parseInt(idx);
        $attemptBox.children().each(function(index) {
            if (index === idx_int) {
                $(this).text(char)
                $(this).css('border-bottom', '2px solid black')
            }
        })
    }

    var index = 0;
    var solution = ["H", "E", "A", "R", "T"]

    $('.btn').click(() => {
        if (index < solution.length) {
            var letter = solution[index]
            socket.send("{ \"letter\" : \"" + letter + "\", \"idx\" : \"" + index + "\" }");
            index += 1
        } 
      
    })


    // SOCKET FUNCTIONS
    
    socket.onopen = function (e) {
        console.log("open", e);
        // if (params.size === "large"){
        //     document.getElementById(dominosContainer).style.visibility = "hidden";
        // } else {
        //     document.getElementById(bigScreen).style.visibility = "hidden";
        // }
     
    }
    
    socket.onmessage = function(msg) {
        var rec = JSON.parse(msg.data);
        addCharToScreen(rec.letter, rec.idx)
        // if the origin of the message is a small screen, do things on the big screen
        
        // if the origin of the message is a large screen
        // addUserToScreen(rec.name, rec.src);
        // const user = new User(rec.uid, rec.name, rec.src)
        // all_users.push(user)
        // console.log(all_users)
    }
    
    socket.oneerror = function(e) {
        console.log("error", e)
    }
    
    socket.onclose = function(e) {
        console.log('close', e)
        // console.error('ERROR: CHAT CLOSED :(')
    }
    
    
    // VARIABLES 
    
    
    // User interactions
    // TODO: CHANGE TO DRAG
    // create target area
    $( ".domino" ).on( "click", function(event) {
        // if not in target area
            // tile go back to original position
        // if yes
            // check answer 
        if (checkAnswer(event)){

        } else {

        }
        // Check answer
        // if correct do some websocket stuff
        // if incorrect, so domething? I mean idk man
    });
    
    function checkAnswer(clicked){
        if (clicked == currentCorrectAnswer){
            updateBigScreen();
            updateSmallScreen();
            updateCorrectAnswer();
            return true;
        }
        else {
            // do something like gray out the thing that they clicked
            return false;
        }
        socket.send("{ \"x\" : "+ event.point.x +", \"y\" : "+ event.point.y +", \"uid\" : \"" + uid + "\", \"color\" : \"" + color + "\" }");

        // find first blank space 
        // if the clicked domino has the same letter as the one 
    }

    function updateBigScreen(){
        // We want to change it so that it gets filled in
    }

    function updateSmallScreen(){
        // make correct/clicked domino disappear
    }
    
    function updateCorrectAnswer() {
        // ok yes so I hard coded these values, I should not have done that but oh well
        switch (letter) {
            case "H":
                currentCorrectAnswer = "E";
                break;
            case "E":
                currentCorrectAnswer = "A";
                break;
            case "A":
                currentCorrectAnswer = "R";
                break;
            case "R":
                currentCorrectAnswer = "T";
                break;
            case "T":
                // they have won the game! 
                break;
            default:
                break;
        }
    }
