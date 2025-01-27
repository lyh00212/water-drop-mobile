import { useEffect } from 'react';

/**
 * 组件初始化时运行
 * @param fn
 */
const useMount = (fn:()=>void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
