import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const Emitter = {
   on: (event, fn) => eventEmitter.on(event, fn),
  emit: (event, arg) => eventEmitter.emit(event, arg),
  listenerCount: (event, fn) => eventEmitter.listenerCount(event, fn)
}

Object.freeze(Emitter);

export default Emitter;
