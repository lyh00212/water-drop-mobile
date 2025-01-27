import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'; // 引入onError
import { Toast } from 'antd-mobile';
import { AUTH_TOKEN } from './constance';

// 尝试部署时，区分环境
// 开发环境
const uri = '/graphql';

const httpLink = createHttpLink({
  // uri: 'http://localhost:3000/graphql',
  // uri: 'http://192.168.10.37:3000/graphql',
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 接口报错统一处理
const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    Toast.show({
      content: '请求参数或者返回的数据格式不对',
    });
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        Toast.clear();
        Toast.show({
          content: '登录失效，请登录',
        });
      }
    });
  }
  if (networkError) {
    Toast.clear();
    Toast.show({
      content: networkError.message,
    });
  }
});

// 初始化apollo-client
export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    // 解决查询详情时的缓存问题
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
