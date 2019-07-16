const fs = require('fs');



class Ticket {
    constructor(ticketId, desktopId) {
        this.ticketId = ticketId;
        this.desktopId = desktopId;
    }
}



class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (this.today !== data.today) {
            this.resetCount();
        } else {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        }
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.saveData();
    }

    nextTicket() {
        this.last++;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveData();

        return `Ticket ${ this.last }`;
    }

    initialTicket() {
        return `Ticket ${ this.last }`;
    }

    lastFourTickets() {
        return this.lastFour;
    }

    attendTicket(desktopId) {
        if (this.tickets.length === 0) {
            return 'No hay tickets que atender';
        }

        let ticketId = this.tickets[0].ticketId;
        this.tickets.shift();

        let ticketToAttend = new Ticket(ticketId, desktopId);
        this.lastFour.unshift(ticketToAttend);

        if (this.lastFour.length > 4) {
            this.lastFour.pop();
        }

        this.saveData();

        return ticketToAttend;
    }

    saveData() {
        const jsonObj = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        const jsonStg = JSON.stringify(jsonObj);
        fs.writeFileSync('./server/data/data.json', jsonStg);
    }

}

module.exports = {
    TicketControl
}