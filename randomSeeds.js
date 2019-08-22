/*

I would really like to build a new expression using calculator.setExpression every time a student
hits a button

the random seed would need the following info

randomSeed = {
    id: GUID,
    degree: randInt(1, 6),
    coefficients: [...]
}

the coefficients array would need randomSeed.degree + 1 values and i would like them
to be random decimals between (-5.9, 5.9) in 0.1 increments including 0

so, for this example:

y = -1.2x^5 + 2.1x^4 - 3.9x -4.2

the randomSeed objoect would look like this

randomSeed = {
    id: "63cb60185a641cfa8bc0b3580039a14b",
    degree: 5,
    coefficients: [ -1.2, 2.1, 0, 0, -3.9, -4.2 ]
}

and to set the expression when the user clicks the button I would use

calculator.setExpression( id: randomSeed.id, latex: expression )

where expression would need to be built with the object like so

const expression = randomSeed.coefficients.reduce((acc, coeff, idx) => {
    acc += acc + `${coeff}x^${randomSeed.degree - idx}`
}, '')


*/

// TESTING EXPRESSION BUILDING

// randomSeed = {
//   id: '63cb60185a641cfa8bc0b3580039a14b',
//   degree: 5,
//   coefficients: [-1.2, 2.1, 0, 0, -3.9, -4.2]
// };

// const expression = randomSeed.coefficients.reduce((acc, coeff, idx) => {
//   if (idx === 0) {
//     return acc + `${coeff}x^${randomSeed.degree} `;
//   }
//   if (idx !== 0 && coeff >= 0) {
//     return acc + `+${coeff}x^${randomSeed.degree - 1} `;
//   } else {
//     return acc + `${coeff}x^${randomSeed.degree - idx} `;
//   }
// }, '');

// console.log(expression);

// TESTING CHOOSING ITEM FROM ARRAY
// this should help me randomly assign the random integer coefficient to be positive or negative

// const myArray = [1, -1];

// const randomItem = myArray[Math.floor(Math.random() * myArray.length)];

// console.log(randomItem);

// I am thinking I could use a constructor for the random seed, that way I can construct
// a new expression every time a student wants one using the new keyword

class Seed {
  constructor(degree) {
    this.id = Math.floor(Math.random() * 1000000000);
    this.degree = degree;
    this.coefficients = [];
    this.expression = '';
  }
  setCoeffs() {
    let degree = this.degree;
    const multiplier = [1, -1];
    while (degree >= 0) {
      const randomMult =
        multiplier[Math.floor(Math.random() * multiplier.length)];
      this.coefficients.push(
        (randomMult * Math.round(Math.random() * 100)) / 10
      );
      degree--;
    }
  }
  setExpression() {
    this.expression = this.coefficients.reduce((acc, coeff, idx) => {
      if (idx === 0) {
        return acc + `${coeff}x^${this.degree} `;
      }
      if (idx !== 0 && coeff >= 0) {
        return acc + `+${coeff}x^${this.degree - 1} `;
      } else {
        return acc + `${coeff}x^${this.degree - idx} `;
      }
    }, '');
  }
}

const newSeed = new Seed(5);
newSeed.setCoeffs();
newSeed.setExpression();

console.log(newSeed.degree);
console.log(newSeed);
