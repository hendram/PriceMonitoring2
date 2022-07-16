class Singletonws {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance() {
        if (!Singletonws.instance) {
            Singletonws.instance = new WebSocket("wss://localhost:8443");
        }
        return Singletonws.instance;
    }
}

export default Singletonws;


