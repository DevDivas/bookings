// preliminary tests just to practice using jest!

const obj1 = {
  a: 1,
  b: {
    c: 2,
  },
};


test('deep equality', () => {
  expect(obj1).toEqual({
    a: 1,
    b: {
      c: 2,
    },
  });
});
