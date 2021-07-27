var loc = window.location;
var wsStart = loc === 'https:' ? 'wss://' : 'ws://'
var endpoint = wsStart + loc.host + '/ws';
var socket = new WebSocket(endpoint)

socket.onopen = function (e) {
    console.log("open", e)
}

socket.onmessage = function(msg) {
    var rec = JSON.parse(msg.data);
    createUser(rec.name, rec.src);
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

// FUNCTIONS

$('#add-user').click(function (event) {
    event.preventDefault();
    const name = $('#name').val()
    const src = $('input[name="profile-pic"]:checked').val()
    socket.send("{ \"name\" : \"" + name + "\", \"src\" : \"" + src + "\" }");
})

function createUser(name, src) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.innerText = name;
    img.src = src;
    div.append(img, h3);
    li.append(div)
    $users.append(li);
    return $users;
}