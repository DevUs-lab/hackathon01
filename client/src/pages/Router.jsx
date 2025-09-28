import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../contexts/Auth'
import PrivateRouter from '../components/PrivateRouter'
import Dashboard from './Dashboard'

const Index = () => {

  const { isAuth } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        {/* <Route path='dashboard/*' element={<PrivateRouter Component={<Dashboard />} />} /> */}
        <Route path='auth/*' element={!isAuth ? <Auth /> : <Navigate to={'/'} />} />
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Redirect root to dashboard */}
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      </Routes>
    </>
  )
}

export default Index