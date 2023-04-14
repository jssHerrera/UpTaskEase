import { Suspense, lazy } from 'react'

const SuspenseRoute = (componentFn) => {
  const Component = lazy(componentFn)
  return (props) => (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props} />
    </Suspense>
  )
}

export default SuspenseRoute
