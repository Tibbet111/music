export const randomArr = (arr = [], count = 3) => {
  arr.sort(() => 0.5 - Math.random())
  const newArr = arr.splice(0, count)
  return newArr
}
