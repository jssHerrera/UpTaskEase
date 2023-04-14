const middlewareError = (error, req, res, next) => {
  if (error.status === 401) {
    return res.status(401).json({ message: 'No tienes autorización para acceder a este recurso' })
  }
  return res.status(error.status || 500).json({ message: error.message })
}
export default middlewareError
