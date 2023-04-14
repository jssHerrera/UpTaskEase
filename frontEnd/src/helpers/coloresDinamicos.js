// const stringToHslColor = (str) => {
//   let hash = 0
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash)
//   }
//   const hue = Math.abs(hash % 360)
//   const saturation = 50 + (hash % 30)
//   const lightness = 40 + (hash % 20)
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`
// }

// export default stringToHslColor

export const hashCode = id => { // Función para generar un número único a partir del nombre de la tarea
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

export const intToRGB = i => { // Función para convertir un número entero en un color RGB
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}
