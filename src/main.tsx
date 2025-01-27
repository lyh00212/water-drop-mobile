import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { ConfigProvider } from 'antd-mobile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { client } from './utils/apollo'

// import App from './App';
import './theme.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { routes } from './routers/menus'
import { ROUTE_COMPONENT } from './routers'
import App from './App'
import StudentInfo from './components/StudentInfo'
import { basePath } from './utils/constance'

createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <StudentInfo>
                    <Routes>
                        <Route path={`${basePath}/login`} element={<Login />} />
                        <Route path={`${basePath}/register`} element={<Register />} />
                        <Route path={`${basePath}/`} element={<App />}>
                            {routes.map(item => {
                                const Component = ROUTE_COMPONENT[item.key]
                                return (
                                    <Route
                                        path={`${basePath}/${item.path}`}
                                        key={item.key}
                                        element={<Component />}
                                    />
                                )
                            })}
                        </Route>
                    </Routes>
                </StudentInfo>
            </BrowserRouter>
        </ApolloProvider>
    </ConfigProvider>
)
