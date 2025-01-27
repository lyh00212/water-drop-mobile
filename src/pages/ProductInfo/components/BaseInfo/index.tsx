import { IProduct } from '@/utils/types';
import { Grid, Image } from 'antd-mobile';
import Hr from '@/components/Hr';
import style from './index.module.less';

interface IProps {
  data:IProduct
}

/**
* 商品详情基本信息
*/
const BaseInfo = ({ data }:IProps) => (
  <div className={style.container}>
    <div className={style.box}>
      <Image src={data.bannerUrl} className={style.img} />
      <div className={style.title}>
        <div className={style.name}>{ data.name }</div>
        <div className={style.desc}>{ data.desc }</div>
      </div>

    </div>
    <Hr />
    <div className={style.box2}>
      <Grid columns={12}>
        <Grid.Item span={4}>
          剩余库存：
          {data.curStock}
        </Grid.Item>
        <Grid.Item span={4}>
          每人限购：
          {data.limitBuyNumber}
        </Grid.Item>
        <Grid.Item span={4}>
          已售：
          {data.buyNumber || 0}
        </Grid.Item>
      </Grid>
    </div>
  </div>

);

export default BaseInfo;
