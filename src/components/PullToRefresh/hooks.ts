import { useEffect, useRef, useState } from 'react';

// 定义最大的y轴距离
const MAX_Y = 100;

// 定义刷新所有的状态
export const STATUS = {
  START: 'start', // 开始下拉刷新
  AWAIT: 'await', // 释放立即刷新
  LOADING: 'loading', // 正在刷新
  SUCCESS: 'success', // 刷新成功
  FINISH: 'finish', // 完成
};

export const TIPS = {
  [STATUS.START]: '开始下拉刷新',
  [STATUS.AWAIT]: '释放立即刷新',
  [STATUS.LOADING]: '正在刷新',
  [STATUS.SUCCESS]: '刷新成功',
};

export const usePullToRefresh = (onRefresh:() => void) => {
  // 定义外部的dom
  const containerRef = useRef<HTMLDivElement>(null);
  // 定义一个状态
  const [status, setStatus] = useState(STATUS.FINISH);
  // 定义一个y的偏移值
  const y = useRef(0);
  useEffect(() => {
    if (!containerRef.current) return () => {};
    containerRef.current.ontouchstart = (e) => {
      // 去除浏览器默认行为，下拉时，界面有部分空白
      e.preventDefault();
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY;
      }
    };
    containerRef.current.ontouchmove = (e) => {
      e.preventDefault();
      // 移动时先判断是否为0，确保页面在最顶端
      if (document.documentElement.scrollTop === 0) {
        // 下滑的偏移量超过了最大的偏移量
        if (e.touches[0].pageY - y.current > MAX_Y) {
          setStatus(STATUS.AWAIT);
          return;
        }
        // 它必须在上一个判断的后边，否则就会一直触发这个判断逻辑
        if (e.touches[0].pageY - y.current > 0) {
          setStatus(STATUS.START);
        }
      }
    };
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchstart = null;
        containerRef.current.ontouchmove = null;
      }
    };
  }, []);
  useEffect(() => {
    if (!containerRef.current) return () => {};
    containerRef.current.ontouchend = async (e) => {
      e.preventDefault();
      // 鼠标释放的时候，判断是否已经处于释放立即刷新，如果是则开始刷新
      if (status === STATUS.AWAIT) {
        setStatus(STATUS.LOADING);
        await onRefresh();
        setStatus(STATUS.SUCCESS);
        setTimeout(() => {
          setStatus(STATUS.FINISH);
        }, 500);
        return;
      }
      // 反之，直接回到完成
      setStatus(STATUS.FINISH);
    };
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchend = null;
      }
    };
  }, [status]);
  return {
    status,
    containerRef,
  };
};
