const randomNum = (size) => Math.floor(Math.random() * size)
export const randomCoordinates = (size = 10) => [randomNum(size), randomNum(size)]
