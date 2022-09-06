class Singletonws {
    private static instance: any;

    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance() {
        if (!Singletonws.instance) {
            Singletonws.instance = new WebSocket("wss://tokmon.org:443");
        }
        return Singletonws.instance;
    }
    static removeInstance() {
          Singletonws.instance = "";
     }

}

export default Singletonws;


