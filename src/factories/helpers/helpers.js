const randomNum = (size) => Math.floor(Math.random() * size)

export const randomCoordinates = (size = 10) => [randomNum(size), randomNum(size)]

// Returns
export const randomCoordinatesParity = (size = 10) => {
  let [x, y] = [randomNum(size), randomNum(size)]
  if (x % 2 === 0) {
    return y % 2 === 0 ? randomCoordinatesParity() : [x, y]
  } else {
    return y % 2 !== 0 ? randomCoordinatesParity() : [x, y]
  }
}
