var loc = window.location;
var wsStart = loc === 'https:' ? 'wss://' : 'ws://'
var endpoint = wsStart + loc.host + '/ws';
var socket = new WebSocket(endpoint)


// SOCKET FUNCTIONS

socket.onopen = function (e) {
    console.log("open", e)
}

socket.onmessage = function(msg) {
    var rec = JSON.parse(msg.data);
    addUserToScreen(rec.name, rec.src);
    const user = new User(rec.uid, rec.name, rec.src)
    all_users.push(user)
    console.log(all_users)
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
    socket.send("{ \"name\" : \"" + name + "\", \"src\" : \"" + src + "\", \"uid\" : \"" + uid + "\" }");
})

function addUserToScreen(name, src) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.innerText = name;
    img.src = src;
    div.append(img, h3);
    li.append(div)
    $users.append(li);
}