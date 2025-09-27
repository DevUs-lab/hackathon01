import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../contexts/Auth'
import PrivateRouter from '../components/PrivateRouter'
import DashboardHome from './Dashboard/DashboardHome'

const Index = () => {

  const { isAuth } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='dashboard/*' element={<PrivateRouter Component={DashboardHome} />} />
        <Route path='auth/*' element={!isAuth ? <Auth /> : <Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

export default Index