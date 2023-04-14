import express from 'express'
import cors from 'cors'
import pingRouter from '../app/routes/Ping.Routes.js'
import userRouter from '../app/routes/Usuario.Router.js'
import proyectosRouter from '../app/routes/Proyecto.Routes.js'
import tareaRouter from '../app/routes/Tarea.Router.js'
import middlewareError from '../app/middelware/error.js'

const app = express()
app.use(express.json())

app.use(cors())

// Router
app.use('/api/v1', pingRouter)
app.use('/api/v1/usuarios', userRouter)
app.use('/api/v1/proyectos', proyectosRouter)
app.use('/api/v1/tareas', tareaRouter)

app.use(middlewareError)

// Routing
app.get('/', (req, res) => {
  res.send('Mi primer servidor con Express. Cursos 💻.')
})

export default app
