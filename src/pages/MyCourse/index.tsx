import {
  Button,
  Card,
  DotLoading, Grid, Image, InfiniteScroll, Modal, PullToRefresh, Space, Steps, Tag,
  Toast,
} from 'antd-mobile';
import dayjs from 'dayjs';
import { useCancelSubscribeCourse, useScheduleRecord } from '@/services/schedule';
import { DAY_FORMAT, SCHEDULE_STATUS } from '@/utils/constance';
import { useGoto } from '@/hooks';
import { ROUTE_KEY } from '@/routers/menus';
import style from './index.module.less';

/**
* 我的课程表
*/
const MyCourse = () => {
  const { Step } = Steps;
  const { go } = useGoto();
  const {
    data, loading, refetch, hasMore, loadMore, onRefresh,
  } = useScheduleRecord();
  const { cancel, loading: cancelLoading } = useCancelSubscribeCourse();
  const cancelSubscribeHandler = async (id:string) => {
    const result = await Modal.confirm({
      content: '确认取消预约吗？一旦取消不能重复预约了！',
    });
    if (result) {
      const res = await cancel(id);
      if (res?.code === 200) {
        Toast.show({
          content: res?.message,
        });
        refetch();
        return;
      }
      Toast.show({
        content: res?.message,
      });
    }
  };
  if (loading) {
    return <DotLoading />;
  }
  return (
    <div className={style.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Steps
          direction="vertical"
        >
          {
          data?.map((item) => (
            <Step
              key={item.id}
              icon={(
                <img
                  src={item.org?.logo}
                  alt="logo"
                  className={style.logo}
                  onClick={() => go(ROUTE_KEY.ORG_INFO, {
                    id: item.org.id,
                  })}
                />
              )}
              title={(
                <Space justify="between" block>
                  <span>
                    {dayjs(item.schedule.schoolDay).format(DAY_FORMAT)}
                &nbsp;
                    {item.schedule.startTime}
                    -
                    {item.schedule.endTime}
                  </span>
                  <Tag
                    color={SCHEDULE_STATUS[item.status][1]}
                  >
                    {SCHEDULE_STATUS[item.status][2]}
                  </Tag>
                </Space>
              )}
              description={(
                <Card>
                  <Grid columns={13} gap={10}>
                    <Grid.Item span={4}>
                      <Image
                        src={item.course.coverUrl}
                        className={style.coverUrl}
                      />
                    </Grid.Item>
                    <Grid.Item span={6}>
                      <div className={style.name}>
                        {item.course.name}
                      </div>
                      <div className={style.teacher}>
                        老师：
                        {item.schedule.teacher?.name}
                      </div>
                    </Grid.Item>
                    <Grid.Item span={3}>
                      {SCHEDULE_STATUS.NO_DO[0] === item.status
                     && (
                     <Button
                       fill="none"
                       color="primary"
                       loading={cancelLoading}
                       onClick={() => cancelSubscribeHandler(item.id)}
                     >
                       取消
                     </Button>
                     )}
                    </Grid.Item>
                  </Grid>
                </Card>
              )}
            />
          ))
        }
        </Steps>
      </PullToRefresh>
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
};

export default MyCourse;
