import {
  CANCEL_SUBSCRIBE, GET_CAN_SUBSCRIBE_COURSES, GET_SCHEDULE_RECORD, GET_SCHEDULES_BY_COURSE,
} from '@/graphql/schedule';
import { DEFAULT_PAGE_SIZE } from '@/utils/constance';
import {
  IScheduleRecord,
  TBaseQuery, TOrgsQuery, TScheduleRecordsQuery, TSchedulesQuery,
} from '@/utils/types';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';

// 获取所有我可预约的课程
export const useCanSubscribeCourses = () => {
  const { data, loading } = useQuery<TOrgsQuery>(GET_CAN_SUBSCRIBE_COURSES);
  return {
    loading,
    data: data?.getCanSubscribeCourses.data,
  };
};

// 获取某个课程的可预约时间的课程表
export const useSchedulesByCourse = (courseId:string) => {
  const { data, loading } = useQuery<TSchedulesQuery>(GET_SCHEDULES_BY_COURSE, {
    variables: {
      courseId,
    },
  });
  return {
    data: data?.getSchedulesByCourse.data,
    loading,
  };
};

// 获取我的课程表记录
export const useScheduleRecord = () => {
  const pn = useRef(1);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState<IScheduleRecord[]>([]);
  const [get, { refetch, loading }] = useLazyQuery<TScheduleRecordsQuery>(GET_SCHEDULE_RECORD);
  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中',
    });
    const res = await get({
      // 清除缓存，就可以让这个接口不走缓存
      fetchPolicy: 'network-only',
      variables: {
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted: () => {
        toast.close();
      },
    });
    return res.data?.getScheduleRecords.data || [];
  };
  // 下拉加载
  const loadMoreHandler = async () => {
    const res = await init(pn.current + 1);
    if (res.length > 0) {
      pn.current += 1;
      setHasMore(true);
      setData((old) => [...old, ...res]);
    } else {
      setHasMore(false);
    }
  };
  // 向上刷新
  const onRefreshHandler = async () => {
    // 重新初始化设置
    pn.current = 1;
    const res = await init();
    // 防止切换type时，hasMore没有变为默认值
    if (res.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setData(res);
  };
  useEffect(() => {
    onRefreshHandler();
  }, []);
  return {
    data,
    refetch,
    loading,
    hasMore,
    onRefresh: onRefreshHandler,
    loadMore: loadMoreHandler,
  };
};

// 立即取消预约课程
export const useCancelSubscribeCourse = () => {
  const [cancel, { loading }] = useMutation<TBaseQuery>(CANCEL_SUBSCRIBE);

  const cancelHandler = async (
    scheduleRecordId: string,
  ) => {
    const res = await cancel({
      variables: {
        scheduleRecordId,
      },
    });
    return res.data?.cancelSubscribeCourse;
  };

  return {
    cancel: cancelHandler,
    loading,
  };
};
