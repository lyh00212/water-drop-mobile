import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, connectFactory } from '@/utils/contextFactory';
import { basePath } from '@/utils/constance';
import { IStudent } from '../utils/types';
import { GET_STUDENT_INFO } from '../graphql/user';

const KEY = 'studentInfo';
const DEFAULT_VALUE = {

};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetStudent = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const { loading, refetch } = useQuery<{ getStudentInfo: { data: IStudent } }>(GET_STUDENT_INFO, {
    onCompleted: (data) => {
      if (data.getStudentInfo) {
        const {
          id, name, tel, avatar, openid,
        } = data.getStudentInfo.data;
        setStore({
          id, name, tel, avatar, openid, refetchHandler: refetch,
        });
        // 当前在登录页面，且已经登录了，那就直接跳到首页
        if (location.pathname === `${location.pathname}login`) {
          nav(`${basePath}/`);
        }
        return;
      }
      setStore({ refetchHandler: refetch });
      // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
      // if (location.pathname !== `${location.pathname}login`
      // && location.pathname !== `${location.pathname}/register`) {
      //   nav(`${location.pathname}login?orgUrl=/`, { replace: true });
      // }
      // 新的
      if (location.pathname.startsWith(basePath)
          && location.pathname !== `${basePath}/login`
          && location.pathname !== `${basePath}/register`) {
        nav(`${basePath}/login?orgUrl=${location.pathname.substring(basePath.length)}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      // 如果不在登录页面，但是目前登录异常，那就直接跳到登录页面
      // if (location.pathname !== `${location.pathname}login`
      // && location.pathname !== `${location.pathname}/register`) {
      //   nav(`${location.pathname}login?orgUrl=/`, { replace: true });
      // }
      // 新的
      if (location.pathname.startsWith(basePath)
        && location.pathname !== `${basePath}/login`
        && location.pathname !== `${basePath}/register`) {
        nav(`${basePath}/login?orgUrl=${location.pathname.substring(basePath.length)}`);
      }
    },
  });
  return { loading };
};
