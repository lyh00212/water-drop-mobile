import { ICourse } from '@/utils/types';
import { Card } from 'antd-mobile';
import Hr from '@/components/Hr';
import style from './index.module.less';

interface IProps {
  // 联合类型：为ICourse这个对象多添加cardName这个属性
  data:(ICourse & { cardName:string })[]
}

/**
* 课程信息
*/
const CourseInfo = ({ data }:IProps) => {
  console.log('courses', data);
  return (
    <div className={style.container}>
      {
        data.map((item) => (
          <Card title={item.cardName} key={item.id}>
            <div className={style.desc}>{item.desc}</div>
            <Hr />
            <div className={style.box}>
              <div className={style.title}>预约信息</div>
              <div className={style.info}>{ item.reserveInfo }</div>
            </div>
            <Hr />
            <div className={style.box}>
              <div className={style.title}>退款信息</div>
              <div className={style.info}>{ item.refundInfo }</div>
            </div>
            <Hr />
            <div className={style.box}>
              <div className={style.title}>其他信息</div>
              <div className={style.info}>{ item.otherInfo }</div>
            </div>
            <Hr />
          </Card>
        ))
      }
    </div>
  );
};

export default CourseInfo;
