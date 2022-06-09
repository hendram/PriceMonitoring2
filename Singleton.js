const EventEmitter = require('events');

class Singleton {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new EventEmitter();
        }
        return Singleton.instance;
    }
}
module.exports = Singleton;
