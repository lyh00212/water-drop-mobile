import { ApolloClient, InMemoryCache } from '@apollo/client'

// 初始化 Apollo 客户端
export const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    // uri: 'http://localhost:8888/graphql',
    // 加cache缓存
    cache: new InMemoryCache(),
})
