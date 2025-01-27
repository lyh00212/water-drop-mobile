import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/services/product';
import Hr from '@/components/Hr';
import { useMemo } from 'react';
import { ICourse } from '@/utils/types';
import { Result } from 'antd-mobile';
import style from './index.module.less';
import BaseInfo from './components/BaseInfo';
import CourseInfo from './components/CourseInfo';
import BuyBottom from './components/BuyBottom';

/**
* 商品详情
*/
const ProductInfo = () => {
  const { id } = useParams();
  const { data } = useProductInfo(id || '');
  // 处理返回数据要加Memo(减少重复计算)
  const courses = useMemo(() => {
    // 把相同的课程的消费卡去重，将其转化为 / 拼接的模式
    const cs :Record<string, ICourse & { cardName:string }> = {};
    data?.cards?.forEach((item:any) => {
      cs[item.course.id] = {
        ...item.course,
        cardName: cs[item.course.id] ? (`${cs[item.course.id].cardName} / ${item.name}`) : item.name,
      };
    });
    return Object.values(cs);
  }, [data?.cards]);
  console.log('courses', courses);
  if (!data) {
    return <Result status="warning" title="提示" description="没有该商品信息" />;
  }
  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <CourseInfo data={courses} />
      <Hr />
      <BuyBottom data={data} />
    </div>
  );
};

export default ProductInfo;
