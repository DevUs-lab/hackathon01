// src/App.jsx
import Router from './pages/Router'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ConfigProvider } from 'antd'
import { useAuthContext } from './contexts/Auth';
import ScreenLoader from './components/ScreenLoader';
import { usePageTracking } from './hooks/useAnalytics';

import '@ant-design/v5-patch-for-react-19';

function App() {
  const { loading } = useAuthContext();

  usePageTracking();

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" } }}>
      {!loading ? <Router /> : <ScreenLoader />}
    </ConfigProvider>
  );
}

export default App;
