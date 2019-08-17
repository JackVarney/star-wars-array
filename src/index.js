const MOVIES = [
  "The Phantom Menace",
  "Attack of the Clones",
  "Revenge of the Sith",
  "A New Hope",
  "The Empire Strikes Back",
  "Return of the Jedi",
  "The Force Awakens",
  "The Last Jedi",
  "The Rise of Skywalker"
];

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
                const newArr = [...target];

                newArr[Symbol.iterator] = function*() {
                  yield newArr[3];
                  yield newArr[4];
                  yield newArr[5];
                  yield newArr[0];
                  yield newArr[1];
                  yield newArr[2];

                  for (let i = 6; i < newArr.length; i += 1) {
                    yield newArr[i];
                  }
                };

                const value = Array.prototype[property].apply(
                  [...newArr],
                  args
                );

                return Array.isArray(value) ? new StarWarsArray(value) : value;
              };
            }

            return response;
          }
        }
      }
    });
  }

  static getDefault() {
    return new StarWarsArray([...MOVIES]);
  }
}

module.exports = { StarWarsArray };
