import { getPingModelo } from '../modelo/Ping.Modelo.js'

const getPingController = async (req, res) => {
  try {
    const result = await getPingModelo()
    console.log(result)
    res.json('ping')
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export { getPingController }
