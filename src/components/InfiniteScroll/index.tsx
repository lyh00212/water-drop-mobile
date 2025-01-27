import { useDownLoad } from './hooks';
import style from './index.module.less';

interface IProps {
  hasMore: boolean;
  loadMore:() => Promise<unknown>;
}

/**
* 无限滚动组件
* 仅供学习
*/
const InfiniteScroll = ({
  hasMore,
  loadMore,
}:IProps) => {
  const { tips } = useDownLoad({ hasMore, loadMore });
  return (
    <div className={style.container}>
      { hasMore ? tips : '没有更多数据了'}
    </div>
  );
};

export default InfiniteScroll;
