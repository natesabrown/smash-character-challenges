import fighters from './fighters.json';

export function getRandomFighters(num, selected) {
  let fighterList = []
  for (let i = 0; i < num; ++i) {
    let randIndex = Math.floor(Math.random() * Object.keys(fighters).length)
    let fighter = Object.values(fighters)[randIndex]
    let currentID = Object.keys(fighters)[randIndex]
    let invalidDLC = (randIndex > 70) && !selected.includes(currentID)
    while (invalidDLC) {
      randIndex = Math.floor(Math.random() * Object.keys(fighters).length)
      fighter = Object.values(fighters)[randIndex]
      currentID = Object.keys(fighters)[randIndex]
      invalidDLC = (randIndex > 70) && !selected.includes(currentID)
    }
    fighterList.push(fighter);
  }
  return fighterList;
}

export function getRandomFighter(selected) {
  return getRandomFighters(1, selected)[0];
}