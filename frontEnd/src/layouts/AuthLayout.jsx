import { lazy, Suspense } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { images } from '../constants'
import { useDarkMode } from '../hooks/useDarkMode'
// import { BtnDarkMode } from '../container/BtnDarkMode'
const BtnDarkMode = lazy(() => import('../container/BtnDarkMode'))
const AuthLayout = () => {
  const { pathname } = useLocation()
  const { toggleTheme } = useDarkMode()

  const location = pathname.replace('/', '')

  return (
    <>
      <main className='lg:flex h-screen overflow-hidden dark:bg-gray-900'>
        <div className={`${location !== '' ? 'w-full' : 'lg:w-1/2 '} h-full p-6`}>
          <div className='flex justify-between items-center'>
            <Link to='/' className='inline-block text-xl leading-4 md:leading-5 md:text-2xl  transition-all'>
              <h1 className='font-bold text-emerald-500'>UpTask</h1>
              <samp className='font-semibold text-dark'>Ease</samp>
            </Link>

            <span
              onClick={toggleTheme} className='cursor-pointer inline-block text-xl transition-all text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200 '
            >
              <Suspense fallback={<p> loading...</p>}>
                <BtnDarkMode />
              </Suspense>
            </span>
          </div>
          <Suspense fallback={<p>loading...</p>}>
            <Outlet />
          </Suspense>
        </div>
        <div className={`${location !== '' ? 'hidden' : 'hidden lg:block lg:w-1/2 '}`}>
          <img src={images.login} alt='Login' className='w-full h-full object-cover transition-all' loading='lazy' />
        </div>
      </main>
    </>
  )
}

export default AuthLayout
