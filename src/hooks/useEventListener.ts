const events: any = {};

const useEventListener = (key, callback, deps) => {
  return React.useEffect(() => {
    let callbacks: any = [];
    if (events[key]) {
      callbacks = events[key];
    } else {
      events[key] = callbacks;
    }
    callbacks.push(callback);
    return () => {
      events[key] = callbacks.filter((c) => c !== callback);
    };
  }, deps);
};

const emit = (key, args) => {
  const callbacks = events[key] || [];
  callbacks.forEach((i) => {
    i.apply(null, args);
  });
};
