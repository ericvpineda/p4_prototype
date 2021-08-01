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
    var wsStart = 'ws://'
    if (loc.protocol == 'https:') {
        wsStart = 'wss://'
    }
    var endpoint = wsStart + loc.host + '/ws'
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
                $(this).append(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="lock bi bi-unlock-fill" viewBox="0 0 16 16">
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
              </svg>`)
                console.log($(this))
            }
        })
    }

    // TIMER 
    const $time_display = $('#time-display')
    var setTime = 5 * 60;
    var timing_fxn;
    timer(setTime)

    function timer(duration) {
        var timer = duration;
        var min, sec;
        timing_fxn = setInterval(() => {
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
        // console.log(index, solutions[curr_riddle].length)
        if (index === solutions[curr_riddle].length - 1) {

            index = -1;
            curr_riddle += 1
            // console.log('ADD NEW RIDDLE ')

            // GAME COMPLETE
            if (curr_riddle === riddles.length) {
                unlockLevel()
                clearInterval(timing_fxn)
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
    
    
    