import { IProduct } from '@/utils/types';
import { Grid } from 'antd-mobile';
import { PhoneFill } from 'antd-mobile-icons';
import { useGoto } from '@/hooks';
import { ROUTE_KEY } from '@/routers/menus';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

/**
* 购买课程工具
*/
const BuyBottom = ({ data }:IProps) => {
  const { go } = useGoto();
  const gotoBuy = (id:string) => {
    go(ROUTE_KEY.BUY, { id });
  };
  console.log('data', data);
  return (
    <div className={style.container}>
      <Grid columns={10}>
        <Grid.Item span={4}>
          <span className={style.preferentialPrice}>
            ￥
            {data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>
            ￥
            {data.originalPrice}
          </span>
        </Grid.Item>
        <Grid.Item span={2}>
          <a href={`tel:${data.org.tel}`} aria-label="tel">
            <PhoneFill className={style.tel} />
          </a>
        </Grid.Item>
        {
          data.curStock === 0
            ? (
              <Grid.Item span={4}>
                <div className={style.buyOver}>商品已经抢完了</div>
              </Grid.Item>
            )
            : (
              <Grid.Item span={4} onClick={() => gotoBuy(data.id)}>
                <div className={style.buy}>立即抢购</div>
              </Grid.Item>
            )
        }

      </Grid>
    </div>
  );
};

export default BuyBottom;
