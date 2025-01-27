import {
  DotLoading, Popup, Result, Space, Steps,
} from 'antd-mobile';
import { useCanSubscribeCourses } from '@/services/schedule';
import { useState } from 'react';
import SubscribePopup from '@/pages/OrderCourse/components/SubscribePopup';
import style from './index.module.less';
import CourseList from './components/CourseList/CourseList';

/**
* 预约课程
*/
const OrderCourse = () => {
  const { data, loading } = useCanSubscribeCourses();
  const [curCourse, setCurCourse] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const { Step } = Steps;
  const onSubscribe = (id:string) => {
    setCurCourse(id);
    setShowPopUp(true);
  };
  const onCloseHandler = () => {
    setCurCourse('');
    setShowPopUp(false);
  };
  if (loading) {
    return <Space justify="center"><DotLoading /></Space>;
  }
  if (!data || data.length === 0) {
    return <Result status="warning" title="没有可以约的课程" />;
  }
  return (
    <div className={style.container}>
      <Steps direction="vertical">
        {
          data?.map((item) => (
            <Step
              key={item.id}
              title={item.name}
              icon={<img src={item.logo} alt="门店logo" className={style.logo} />}
              description={
                item.courses
                  ? <CourseList dataSource={item.courses} onSubscribe={onSubscribe} />
                  : null
              }
            />
          ))
        }
      </Steps>
      <Popup
        position="bottom"
        visible={showPopUp}
        onMaskClick={onCloseHandler}
        onClose={onCloseHandler}
      >
        {
          curCourse && <SubscribePopup courseId={curCourse} onClose={onCloseHandler} />
        }
      </Popup>
    </div>
  );
};

export default OrderCourse;
