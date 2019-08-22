const elt = document.getElementById('calculator');

// remove the secret folders option when not testing
const calculator = Desmos.GraphingCalculator(elt, {
  administerSecretFolders: true
});

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
    if (this.coefficients[0] === 0) {
      this.coefficients[0] = 1;
    }
  }
  setExpression() {
    this.expression = this.coefficients.reduce((acc, coeff, idx) => {
      if (idx === 0) {
        return acc + `${coeff}x^${this.degree} `;
      }
      if (idx !== 0 && coeff >= 0) {
        return acc + `+${coeff}x^${this.degree - idx} `;
      } else {
        return acc + `${coeff}x^${this.degree - idx} `;
      }
    }, '');
  }
}
let seed;

const newGraphButton = document.getElementById('generateNewSeed');
newGraphButton.addEventListener('click', () => {
  calculator.setBlank();
  seed = new Seed(4);
  seed.setCoeffs();
  seed.setExpression();
  calculator.setExpression({
    id: `${seed.id}`,
    latex: `${seed.expression}`,
    secret: true
  });
});
