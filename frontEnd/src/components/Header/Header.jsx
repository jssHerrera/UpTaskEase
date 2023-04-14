import { Link } from 'react-router-dom'
import { GrommetIconsSearch } from '../../container/Icon'
import { lazy, memo, Suspense } from 'react'
import { useProyectos } from '../../hooks/useProyectos'
import { useDarkMode } from '../../hooks/useDarkMode'
const ModalCuenta = lazy(() => import('../../container/ModalCuenta'))

export const Header = memo(function Header () {
  const { cuenta, handleClickCuenta } = useProyectos()
  const { toggleTheme, theme } = useDarkMode()

  return (
    <div className='fixed bg-white z-40 dark:bg-gray-900 text-dark'>
      <header className='w-screen flex gap-2 justify-between h-14 shadow-md dark:shadow-lg  px-5 sm:px-10'>
        <Link to='/proyectos' className='flex flex-col justify-center items-center text-xl leading-5'>
          <h1 className='font-bold text-emerald-500'>UpTask</h1>
          <samp className='font-semibold'>Ease</samp>

        </Link>
        <div className='flex items-center gap-3'>
          <div className='flex items-center'>
            <div className='block sm:hidden'>
              <GrommetIconsSearch className='icon' />
            </div>
            <div className='relative hidden sm:block '>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <GrommetIconsSearch />
              </div>
              <input type='search' id='default-search' className=' input-form px-2 py-1  pl-10 input-dark   ' placeholder='Search.....' />
            </div>
          </div>
          <div>
            <span className={`${cuenta && 'bg-emerald-500/60'} w-8 h-8 borde flex items-center  justify-center rounded-full relative hover:bg-emerald-500/60 cursor-pointer overflow-hidden`} onClick={handleClickCuenta}>
              <img src='https://i.pravatar.cc/400?img=68' alt='img' loading='lazy' className='w-6 h-6 rounded-full' />
            </span>
          </div>
        </div>
      </header>
      {cuenta &&
        <Suspense fallback={<p>Cargando...</p>}>
          <ModalCuenta toggleTheme={toggleTheme} theme={theme} />
        </Suspense>}
    </div>
  )
})
