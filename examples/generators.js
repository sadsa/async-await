function* additionGenerator(i) {
  const numbers = [1,2,3,4,5,6,7,8];
  yield numbers[i];
}

let value = 0;
let maxNumber = 10;

do {
  let gen = additionGenerator(value);
  value = gen.next().value;
  value;
} while (value > 0);
