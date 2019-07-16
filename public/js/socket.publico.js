var socket = io();

var audio = new Audio('/audio/new-ticket.mp3');



socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Se perdió conexión con el servidor');
});

var lblTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var lblDesktops = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

socket.on('getActualStatus', function(response) {
    updateLabels(response.lastFour);
});

function updateLabels(tickets) {
    for (var i = 0; i < tickets.length; i++) {
        lblTickets[i].text('Ticket ' + tickets[i].ticketId);
        lblDesktops[i].text('Escritorio ' + tickets[i].desktopId);
    }

    if (tickets.length > 0) {
        audio.play();
    }
}