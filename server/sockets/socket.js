const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    socket.on('getNextTicket', (data, callback) => {
        callback(ticketControl.nextTicket());
    });

    socket.on('attendTicket', (data, callback) => {
        if (!data.desktopId) {
            callback({ ok: false, message: 'El escritorio es necesario' });
        } else {
            let resp = ticketControl.attendTicket(data.desktopId);

            if (typeof resp === 'string') {
                callback({ ok: false, message: resp });
            } else {
                callback({ ok: true, ticket: resp });

                socket.broadcast.emit('getActualStatus', {
                    initial: ticketControl.initialTicket(),
                    lastFour: ticketControl.lastFourTickets()
                });
            }
        }
    });

    socket.emit('getActualStatus', {
        initial: ticketControl.initialTicket(),
        lastFour: ticketControl.lastFourTickets()
    });
});