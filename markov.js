/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i=0; i<this.words.length; i+=1){
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if(chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }

/**Picking random choice from array */
/**Static keyword defines static methods for classes. static methods are called directly
 * on the class-without creating an instance/object of the class.
 */
  static choice(array){
    return array[Math.floor(Math.random()*array.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    //picking a random key to begin with.
    let keys = Array.from(this.chains.keys()); //Array.from() method returns an array from any object with a length property.
    let key = MarkovMachine.choice(keys);
    let out = [];

    //produce markov chain until reaching termination word
    while(out.length < numWords && key != null){
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}
module.exports = {MarkovMachine};
