import { plugins } from './';

export function handleErrors() {

  const args = Array.prototype.slice.call(arguments);

  plugins.notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  this.emit('end');
};
