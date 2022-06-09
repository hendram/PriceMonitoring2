var example_emitter = new (require('events').EventEmitter);
example_emitter.on("test", function () { console.log("test"); });
example_emitter.on("print", function (message) { console.log(message); });
example_emitter.emit("test");
example_emitter.emit("print", "message");
example_emitter.emit("unhandled");

