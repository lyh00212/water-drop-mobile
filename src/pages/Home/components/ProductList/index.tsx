import { useProducts } from '@/services/product';
import {
  ErrorBlock, Grid, InfiniteScroll, PullToRefresh,
} from 'antd-mobile';
// import PullToRefresh from '@/components/PullToRefresh';
// import InfiniteScroll from '@/components/InfiniteScroll';
import { useGoto } from '@/hooks';
import { ROUTE_KEY } from '@/routers/menus';
import style from './index.module.less';
import ProductCard from '../ProductCard';

interface IProps {
  name:string; // 搜索的关键字
  type:string // 搜索的类型
}

/**
* 商品列表
*/
const ProductList = ({
  name,
  type,
}:IProps) => {
  const {
    data, onRefresh, hasMore, loadMore,
  } = useProducts(name, type);
  const { go } = useGoto();
  const goProductInfo = (id:string) => {
    go(ROUTE_KEY.PRODUCT_INFO, { id });
  };
  if (data && data.length === 0) {
    return <ErrorBlock status="empty" />;
  }
  return (
    <div className={style.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Grid columns={2} gap={10}>
          {data?.map((item) => (
            <Grid.Item key={item.id} onClick={() => goProductInfo(item.id)}>
              <ProductCard data={item} />
            </Grid.Item>
          ))}
        </Grid>
      </PullToRefresh>
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />

    </div>
  );
};

export default ProductList;
