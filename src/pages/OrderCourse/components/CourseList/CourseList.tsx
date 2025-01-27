import { Button, Image, List } from 'antd-mobile';
import { ICourse, ITeacher } from '@/utils/types';
import style from './index.module.less';

interface IProps {
  dataSource:ICourse[]
  onSubscribe:(id:string) => void
}
/**
* 课程列表
*/
const CourseList = ({
  dataSource,
  onSubscribe,
}:IProps) => {
  const subscribeHandler = (id:string) => {
    onSubscribe(id);
  };
  return (
    <div className={style.container}>
      <List>
        {
            dataSource.map((item) => (
              <List.Item
                key={item.id}
                // 左边的部分
                prefix={(
                  <Image src={item.coverUrl} alt="课程图片" className={style.coverUrl} />
            )}
                // 右边的部分
                extra={(
                  <Button fill="none" color="primary" onClick={() => subscribeHandler(item.id)}>预约</Button>
            )}
                // 中间部分的下边
                description={
                    item.teachers?.map((it:ITeacher) => it.name).join(',')
                }
              >
                {/* 中间部分 */}
                {item.name}
              </List.Item>
            ))
        }

      </List>
    </div>
  );
};

export default CourseList;
