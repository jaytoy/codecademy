// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory functions to create multiple DNAs
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      for (let i = 0; i < this.dna.length; i++) {
        let newBase = returnRandBase()
        while (this.dna[i] === newBase) {
          newBase = returnRandBase();
        }
        this.dna[i] = newBase;
      }
      return this.dna;
    },
    compareDNA(pAequor) {
      let commonBases = 0
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          commonBases += 1;
        }
      }
      const percentage = (commonBases / this.dna.length) * 100;
      const percentageTo2Deci = percentage.toFixed(2);
      console.log(`${this.specimenNum} and ${pAequor.specimenNum} have ${percentageTo2Deci}% DNA in common.`);
    },
    willLikelySurvive() {
      let bases = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          bases.push(this.dna[i])
        }
      }
      return bases.length / this.dna.length >= 0.6
    },
  };
};

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newSpecimen = pAequorFactory(idCounter, mockUpStrand());
  if (newSpecimen.willLikelySurvive()) {
    survivingSpecimen.push(newSpecimen);
  }
  idCounter++
}

console.log(survivingSpecimen);