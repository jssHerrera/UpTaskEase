// export default stringToHslColor
export const coloresDinamicos = (number) => {
  const hue = (number * 137.508) % 360
  return `hsla(${hue}, 50%, 75%, 1)`
}
