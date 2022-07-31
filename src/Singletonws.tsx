class Singletonws {
    private static instance: WebSocket;

    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance(): WebSocket {
        if (!Singletonws.instance) {
            Singletonws.instance = new WebSocket("wss://localhost");
        }
        return Singletonws.instance;
    }
}

export default Singletonws;


