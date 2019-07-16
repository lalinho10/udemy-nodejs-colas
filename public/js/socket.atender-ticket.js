var smDesktopId = $('#smDesktopId');
var smIniTicket = $('#smIniTicket');

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}



var desktopId = searchParams.get('escritorio');
smDesktopId.text(desktopId);

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Se perdió conexión con el servidor');
});



$('#btnAttend').on('click', function() {
    socket.emit('attendTicket', { desktopId: desktopId }, function(response) {
        if (response.ok) {
            smIniTicket.text('Ticket ' + response.ticket.ticketId);
        } else {
            smIniTicket.text(response.message);
            alert(response.message);
        }
    });
});