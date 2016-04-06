var test = {
  drawing: {
    something: 1,
    somethingElse: 2
  },
  painting: {
    something: 1,
    somethingElse: this.something
  }
};

var test2 = {
  drawing: 2,
  painting: this.drawing
};


console.log(test2.painting);