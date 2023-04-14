import { memo } from 'react'
import { ContenProyecto } from './ContenProyecto'

const TarjetaProjecto = memo(function TarjetaProjecto ({ proyectos }) {
  return (
    <main className='grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 text-sm leading-6'>
      {proyectos.map(elem => (
        <ContenProyecto key={elem.proyectoID} {...elem} />
      ))}
    </main>
  )
})

export default TarjetaProjecto
