var loc = window.location;
var wsStart = 'ws://'
if (loc.protocol == 'https:') {
    wsStart = 'wss://'
}
var endpoint = wsStart + loc.host + '/ws'
console.log('name= ', endpoint)
var socket = new WebSocket(endpoint)


// SOCKET FUNCTIONS

socket.onopen = function (e) {
    console.log("open", e)
}

socket.onmessage = function(msg) {
    var rec = JSON.parse(msg.data);
    if (rec.ready) {
        if (loc.href.indexOf("login") > -1) {
            location.href = "/game";
        } else {
            location.href = "/individualGameScreen";
        }
    } else if (rec.name) {
        addUserToScreen(rec.name, rec.src);
        const user = new User(rec.uid, rec.name, rec.src)
        all_users.push(user)
    }
}

socket.oneerror = function(e) {
    console.log("error", e)
}

socket.onclose = function(e) {
    console.log('close', e)
    // console.error('ERROR: CHAT CLOSED :(')
}


// VARIABLES 

const $users = $('#users')
const $profilePics = $('profile-pics')
const all_users = []

// FUNCTIONS

$('#add-user').click(function (event) {
    event.preventDefault();
    const name = $('#name').val()
    const src = $('input[name="profile-pic"]:checked').val()
    const uid = $('#uid').text()
    if (src === undefined || name === "") {
        $('#error').toggle()
        $('#error').fadeOut(3000);
    } else {
        socket.send("{ \"name\" : \"" + name + "\", \"src\" : \"" + src + "\", \"uid\" : \"" + uid + "\" }");
        $('#add-user').attr('disabled', 'disabled')
    }
})

$('#ready').click(function (event) {
    event.preventDefault();
    socket.send("{ \"ready\" : \"" + true + "\"}");
})

function addUserToScreen(name, src) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');

    h3.innerText = name;
    img.src = src;
    div.append(img, h3);
    div.classList.add('user-card')
    li.append(div)
    $users.append(li);
}