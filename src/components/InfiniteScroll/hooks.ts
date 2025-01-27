import _ from 'lodash';
import { useEffect, useState } from 'react';

const OFFSET = 90;

export const useDownLoad = ({
  hasMore = false,
  loadMore = () => {},
}) => {
  const [tips, setTips] = useState('');
  useEffect(() => {
    // 滚动监听
    const scrollHandler = async () => {
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (hasMore && (clientHeight + scrollTop >= scrollHeight - OFFSET)) {
        setTips('加载中...');
        await loadMore();
        setTips('加载完成');
        setTimeout(() => {
          setTips('');
        }, 500);
      }
    };
    window.onscroll = _.throttle(scrollHandler, 500);
    return () => {
      window.onscroll = null;
    };
  }, [hasMore]);
  return {
    tips,
  };
};
