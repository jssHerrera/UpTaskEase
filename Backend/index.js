import app from './config/app.js'
import { PORT } from './config/config.js'

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en http://localhost:${PORT}`)
})
