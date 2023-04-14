import { PajamasHamburger, TablerPlus, PhNotePencilDuotone, MaterialSymbolsDeleteOutline } from '../container/Icon'

const BtnOptions = () => {
  return (
    <div className='fixed right-6 bottom-6 group'>
      <div className='hidden group-hover:block'>
        <div className='flex flex-col invisible opacity-0 group-hover:opacity-100 group-hover:visible  items-center mb-4 space-y-2 transition-opacity'>
          <span className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400'>
            <TablerPlus />
          </span>
          <span className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400'>
            <PhNotePencilDuotone />
          </span>
          <span className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400'>
            <MaterialSymbolsDeleteOutline />
          </span>
        </div>
      </div>
      <div className='flex items-center justify-center text-white shadow bg-emerald-500 rounded-full w-14 h-14 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-500/50 focus:ring-4 focus:ring-blue-300  transition-colors cursor-pointer'>
        <PajamasHamburger />
      </div>
    </div>
  )
}
export default BtnOptions
