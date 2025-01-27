import { useGoto, useMatchedRoute } from '@/hooks';
import { LeftOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import style from './index.module.less';

/**
* 底部菜单组件
*/
const Header = () => {
  const { back } = useGoto();
  const route = useMatchedRoute();
  // 回退
  const onclickHandler = () => {
    back();
  };

  // 如果显示头部的标记不存在则不显示顶部
  if (route?.hideHeader) {
    return null;
  }
  return (
    <div className={classNames({
      [style.containerLarge]: route?.isMenu,
      [style.containerSmall]: !route?.isMenu,
    })}
    >
      {
        !route?.isMenu && <LeftOutline className={style.back} onClick={onclickHandler} />
      }

      <div className={style.title}>
        {route?.name}
      </div>
    </div>
  );
};

export default Header;
