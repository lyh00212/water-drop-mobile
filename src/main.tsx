import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import enUS from 'antd-mobile/es/locales/en-US'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider locale={zhCN}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </ConfigProvider>
    </StrictMode>
)
