var lblTicket = $('#lblNuevoTicket');

var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Se perdió conexión con el servidor');
});

socket.on('getActualStatus', function(response) {
    lblTicket.text(response.initial);
});



$('#btnTicket').on('click', function() {
    socket.emit('getNextTicket', null, function(response) {
        lblTicket.text(response);
    });
});