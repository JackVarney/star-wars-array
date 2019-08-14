const createStarWarsIterator = target =>
  function*() {
    if (target.length < 8) {
      throw new Error("There are 8 movies mate");
    }

    yield target[3];
    yield target[4];
    yield target[5];
    yield target[0];
    yield target[1];
    yield target[2];

    var i = 5;
    while (i < target.length - 1) {
      i += 1;

      yield target[i];
    }
  };

class StarWarsArray {
  constructor(initialArray) {
    return new Proxy(initialArray, {
      get(target, property) {
        switch (property) {
          case "0":
            return target[3];
          case "1":
            return target[4];
          case "2":
            return target[5];
          case "3":
            return target[0];
          case "4":
            return target[1];
          case "5":
            return target[2];

          default: {
            const response = target[property];

            if (typeof response === "function") {
              return function(...args) {
                target[Symbol.iterator] = createStarWarsIterator(target);

                const value = Array.prototype[property].apply(
                  new Array(...target),
                  args
                );

                return Array.isArray(value) ? new StarWarsArray(value) : value;
              };
            }

            return response;
          }
        }
      },
      set(target, property, value) {
        switch (property) {
          case "0":
            target[3] = value;
          case "1":
            target[4] = value;
          case "2":
            target[5] = value;
          case "3":
            target[0] = value;
          case "4":
            target[1] = value;
          case "5":
            target[2] = value;
          default:
            target[property] = value;
        }
      }
    });
  }
}

module.exports = { StarWarsArray };
