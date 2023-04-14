import { useDarkMode } from '../hooks/useDarkMode'
import { MdiMoonWaningCrescent, MdiWhiteBalanceSunny } from './Icon'

const BtnDarkMode = () => {
  const { theme } = useDarkMode()
  return (
    <>
      {theme ? <MdiWhiteBalanceSunny /> : <MdiMoonWaningCrescent />}
    </>
  )
}

export default BtnDarkMode
