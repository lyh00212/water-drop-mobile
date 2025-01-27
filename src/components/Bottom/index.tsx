import { TabBar } from 'antd-mobile';
import { routes } from '@/routers/menus';
import { useGoto, useMatchedRoute } from '@/hooks';
import style from './index.module.less';
import SvgWrapper from '../SvgWrapper';

/**
* 底部菜单组件
*/
const Bottom = () => {
  const { go } = useGoto();
  const route = useMatchedRoute();
  // 只有有菜单标记的页面才需要底部组件
  if (!route?.isMenu) {
    return null;
  }
  // 选择菜单跳转不同的路由
  const onChangeHandler = (key:string) => {
    go(key);
  };

  // 渲染icon
  const iconRender = (is: boolean, icon?: string) => (
    <SvgWrapper
      src={icon}
      color={is ? '#01979a' : '#999999'}
    />
  );
  return (
    <div className={style.container}>
      <TabBar onChange={onChangeHandler} activeKey={route?.key}>
        {
            routes.filter((it) => it.isMenu).map(
              (item) => (
                <TabBar.Item
                  title={item.name}
                  key={item.key}
                  // is 代表icon的选中状态
                  icon={(is) => iconRender(is, item.icon)}
                />
              ),
            )
        }
      </TabBar>
    </div>
  );
};

export default Bottom;
