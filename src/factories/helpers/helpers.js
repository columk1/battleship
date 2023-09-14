const randomNum = (size) => Math.floor(Math.random() * size)

export const randomCoordinates = (size = 10) => [randomNum(size), randomNum(size)]

export const randomCoordinatesParity = (size = 10) => {
  let [x, y] = [randomNum(size), randomNum(size)]
  if (((x + 10) * (y + 10)) % 2 === 0) {
    return randomCoordinatesParity()
  } else {
    return [x, y]
  }
}
