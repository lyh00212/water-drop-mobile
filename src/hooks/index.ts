import { useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import {
  getRouteByKey, routes,
} from '@/routers/menus';
import { basePath } from '@/utils/constance';

export const useTitle = (title:string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

/**
 * 通过页面跳转器
 */
export const useGoto = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  const go = (propKey?:string, params?:Record<string, string | number>) => {
    if (!propKey) {
      navigate(`${basePath}/`);
    }
    const route = getRouteByKey(propKey!);
    if (route) {
      if (!params) {
        navigate(`${basePath}/${route.path}`);
      } else {
        // 例子：/page/:id params:{id:1}  将会转化为=>   /page/:1
        const url = route.path.replace(/\/:(\w+)/g, (exp:string, exp1:string) => `/${params[exp1]}`);
        navigate(`${basePath}/${url}`);
      }
    }
  };
  return { back, go };
};

/**
 * 获取当前页面的url匹配的路由
 */
export const useMatchedRoute = () => {
  const r = useLocation();
  const route = useMemo(() => routes.find(
    (item:any) => matchPath(`${basePath}/${item.path}`, r.pathname),
  ), [r.pathname]);
  return route;
};
