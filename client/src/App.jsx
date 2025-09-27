import Router from './pages/Router'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ConfigProvider, App as AntdApp } from 'antd'
import { useAuthContext } from './contexts/Auth';
import ScreenLoader from './components/ScreenLoader';
import { usePageTracking } from './hooks/useAnalytics';

import '@ant-design/v5-patch-for-react-19';
// bun install @ant-design/v5-patch-for-react-19 --save  // you should to install in new projuct or you will get an error

function App() {

  const { isLoading } = useAuthContext()

  usePageTracking();

  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" } }}>
        {!isLoading
          ? <Router />
          : <ScreenLoader />
        }
      </ConfigProvider>

    </>
  )
}

export default App
