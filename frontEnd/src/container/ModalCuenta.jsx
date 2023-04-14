
const ModalCuenta = ({ toggleTheme, theme }) => {
  return (
    <div className='fixed right-5 sm:right-10 top-14 z-50'>
      <div
        className='w-full sm:min-w-[350px] flex flex-col shadow-lg dark:shadow-2xl bg-white dark:bg-zinc-800 rounded-sm ' onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='flex flex-col text-gray-500 capitalize dark:text-zinc-400'>
          <div className='flex flex-col gap-3 px-4 py-2 '>
            <h3 className='text-xs font-medium uppercase'>
              cuenta
            </h3>
            <div className='inline-flex items-center gap-3'>
              <img src='https://i.pravatar.cc/400?img=68' alt='img' loading='lazy' className='w-8 h-8 rounded-full' />
              <span>
                <p> jesus herrera espiritu</p>
                <small>jesus@correo.com</small>
              </span>
            </div>
          </div>
          <div className='w-full border-t-4  dark:border-gray-600 py-[6px]'>
            <span className='drop-item drop-btn-hover drop-dark-hover' onClick={toggleTheme}>
              {theme ? 'Light' : 'dark'}
            </span>
          </div>
          <div className='w-full border-t-4 dark:border-gray-600 py-[6px]'>
            <span className='drop-item drop-btn-hover drop-dark-hover'>
              Salir
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalCuenta
