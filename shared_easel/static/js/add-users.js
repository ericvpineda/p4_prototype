var loc = window.location;
var wsStart = loc === 'https:' ? 'wss://' : 'ws://'
var endpoint = wsStart + loc.host + '/ws';
var socket = new WebSocket(endpoint)

socket.onopen = function (e) {
    // console.log("open", e)
}

socket.onmessage = function(msg) {
    console.log("message", msg)
}

socket.oneerror = function(e) {
    console.log("error", e)
}

socket.onclose = function(e) {
    console.log('close', e)
    // console.error('ERROR: CHAT CLOSED :(')
}