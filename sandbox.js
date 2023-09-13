import Ship from './src/model/ship'

const randomNum = (size) => Math.floor(Math.random() * size)
const randomCoordinates = (size = 10) => [randomNum(size), randomNum(size)]

const [x, y] = randomCoordinates()

console.log(x, y)
