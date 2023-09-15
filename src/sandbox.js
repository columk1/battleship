let SIZE = 10

let board = Array(SIZE)
  .fill(null)
  .map(() => Array(SIZE).fill(null))

getEveryThirdCell = () => {
  let allCoords = []
  board.map((row, i) => row.map((cell, index) => allCoords.push([i, index])))
  let result = allCoords.filter((coord, index) => index % 3 === 0)
  let random = Math.floor(Math.random() * result.length)
  return result[random]
}

console.log(getEveryThirdCell())
