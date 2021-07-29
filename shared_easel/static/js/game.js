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
    var set_time = 5000; // Note: in ms
    var curr_time = new Date().getTime();
    var rem_time =  set_time - curr_time
    
    var index = 0;
    var curr_riddle = 0;
    var riddles = [
        ["“What is the Cal Mascot?“"],
        ["“What has to be broken before you use it?“"],
        ["“If you break me, I’ll not stop working. If you can touch me, my work is done. If you lose me, you must find me with a ring soon after. What am I?”"],
    ]
    var solutions = [
        ["B ", "E ", "A ", "R "],
        ["E ", "G ", "G "],
        ["H ", "E ", "A ", "R ", "T "],
    ]
    var $riddleBox = $('.riddle');
    var $levelBox = $('.level')
    

    // FUNCTIONS

    function addRiddle() {
        $riddleBox.empty()
        const newRiddle = document.createElement('p')
        $(newRiddle).text(riddles[curr_riddle])
        $riddleBox.append($(newRiddle))

        $attemptBox.empty()
        for (let _ of solutions[curr_riddle]) {
            const placeHolder = document.createElement('span')
            $(placeHolder).text('? ')
            $attemptBox.append($(placeHolder))
        }
    }

    if ($riddleBox.children().length === 0) {
        addRiddle()
    }

    function addCharToScreen(char, idx) {
        const idx_int = parseInt(idx);
        $attemptBox.children().each(function (curr_index) {
            if (curr_index === idx_int) {
                $(this).text(char)
                $(this).css('border-bottom', '2px solid black')
            }
        })
    }

    function unlockLevel() {
        $levelBox.children().each(function (curr_index) {
            if (curr_index == curr_riddle - 1) {
                $(this).empty()
            }
        })
    }

    // TIMER 
    const $time_display = $('#time-display')
    var setTime = 5 * 60;
    timer(setTime)

    function timer(duration) {
        var timer = duration;
        var min, sec;
        var timing_fxn = setInterval(() => {
            min = parseInt(timer / 60, 10);
            sec = parseInt(timer % 60, 10);

            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            $time_display.text(min + ":" + sec)

            if (--timer < 0) {
                clearInterval(timing_fxn)
                $('.gameover').removeClass('gameover').addClass('gameover-on')
                // console.log('GAMEOVER POPUP ADDED')
            }
        }, 1000)
    }

    function updateLetter() {
        console.log(index, solutions[curr_riddle].length)
        if (index === solutions[curr_riddle].length - 1) {

            index = -1;
            curr_riddle += 1
            console.log('ADD NEW RIDDLE ')
            if (curr_riddle === riddles.length) {
                $levelBox.children().each(function () { $(this).empty() })
                $('.gamecomplete').removeClass('gamecomplete').addClass('gamecomplete-on')
            } else {
                addRiddle()
                unlockLevel()
            }
        } 
    }
      



    // SOCKET FUNCTIONS
    
    socket.onopen = function (e) {
        console.log("open", e);
    }
    
    socket.onmessage = function(msg) {
        var rec = JSON.parse(msg.data);
        console.log('LETTER SENT =', rec.letter)
        console.log('CORRECT LETTER =', solutions[curr_riddle][index])
        console.log('INDEX =', index)
        console.log(rec.letter + " " == solutions[curr_riddle][index])
        
        if (rec.letter + " " === solutions[curr_riddle][index]) {
            addCharToScreen(rec.letter + " ", index)
            updateLetter()
            index += 1
        }
    }
    
    socket.oneerror = function(e) {
        console.log("error", e)
    }
    
    socket.onclose = function(e) {
        console.log('close', e)
    }
    
    
    // VARIABLES 
    
    
    