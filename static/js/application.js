$(document).ready(function(){
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/channel');
    var numbers_received = [];

    //receive details from server
    socket.on('notify', function(msg) {
        console.log(msg);
        toggleAlert();
    });
});

function toggleAlert(){
    $("#alertBox").fadeIn();
    closeSnoAlertBox();
}

function closeSnoAlertBox(){
    window.setTimeout(function () {
        $("#alertBox").fadeOut(300)
    }, 3000);
}