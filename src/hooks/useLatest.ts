import { useRef } from 'react';

/**
 * 获取最新的数据
 * @param fn
 */
const useLatest = <T>(value:T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
