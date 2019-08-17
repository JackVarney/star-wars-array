const chai = require("chai");
const { StarWarsArray } = require("../src");

const expect = chai.expect;

describe("Star Wars Array", () => {
  let swa = StarWarsArray.getDefault();

  beforeEach(() => {
    swa = StarWarsArray.getDefault();
  });

  it("should exist", () => expect(swa));

  it("should get items in the correct order", () => {
    expect(swa[0]).to.equal("A New Hope");
    expect(swa[1]).to.equal("The Empire Strikes Back");
    expect(swa[2]).to.equal("Return of the Jedi");
    expect(swa[3]).to.equal("The Phantom Menace");
    expect(swa[4]).to.equal("Attack of the Clones");
    expect(swa[5]).to.equal("Revenge of the Sith");
    expect(swa[6]).to.equal("The Force Awakens");
  });

  it("should set items in the correct order", () => {
    swa[0] = 1;
    swa[1] = 2;
    swa[2] = 3;
    swa[3] = 4;
    swa[4] = 5;
    swa[5] = 6;
    swa[6] = 7;

    expect(swa[0]).to.equal(4);
    expect(swa[1]).to.equal(5);
    expect(swa[2]).to.equal(6);
    expect(swa[3]).to.equal(1);
    expect(swa[4]).to.equal(2);
    expect(swa[5]).to.equal(3);
    expect(swa[6]).to.equal(7);
  });

  it("should still possess a map function", () => {
    const mappedIntoLogicalOrder = swa.map(v => v);

    expect(mappedIntoLogicalOrder[0]).to.equal("The Phantom Menace");
    expect(mappedIntoLogicalOrder[1]).to.equal("Attack of the Clones");
    expect(mappedIntoLogicalOrder[2]).to.equal("Revenge of the Sith");
    expect(mappedIntoLogicalOrder[3]).to.equal("A New Hope");
    expect(mappedIntoLogicalOrder[4]).to.equal("The Empire Strikes Back");
    expect(mappedIntoLogicalOrder[5]).to.equal("Return of the Jedi");
    expect(mappedIntoLogicalOrder[6]).to.equal("The Force Awakens");

    const mappedToChronologicalOrder = mappedIntoLogicalOrder.map(v => v);

    expect(mappedToChronologicalOrder[0]).to.equal("A New Hope");
    expect(mappedToChronologicalOrder[1]).to.equal("The Empire Strikes Back");
    expect(mappedToChronologicalOrder[2]).to.equal("Return of the Jedi");
    expect(mappedToChronologicalOrder[3]).to.equal("The Phantom Menace");
    expect(mappedToChronologicalOrder[4]).to.equal("Attack of the Clones");
    expect(mappedToChronologicalOrder[5]).to.equal("Revenge of the Sith");
    expect(mappedToChronologicalOrder[6]).to.equal("The Force Awakens");
  });

  it("should still possess a filter function", () => {
    const filteredStarWarsArray = swa.filter(
      movie => movie !== "The Phantom Menace"
    );

    expect(filteredStarWarsArray).to.not.contain("The Phantom Menace");
  });

  it("should still possess a reduce function", () => {
    const allMovieTitles = swa.reduce((acc, cur, index) => `${acc}${cur} `, "");

    expect(allMovieTitles).to.equal(
      "A New Hope The Empire Strikes Back Return of the Jedi The Phantom Menace Attack of the Clones Revenge of the Sith The Force Awakens The Last Jedi The Rise of Skywalker "
    );
  });
});
