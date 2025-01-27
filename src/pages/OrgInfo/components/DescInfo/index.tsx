import { useState, useEffect } from 'react';

import { IOrganization } from '@/utils/types';
import { Image } from 'antd-mobile';
import style from './index.module.less';

interface IProps {
  data:IOrganization
}

/**
* 门店介绍
*/
const DescInfo = ({
  data,
}:IProps) => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState, data);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.description}>{data.description}</div>
      {
        (data.orgOtherImg || []).map((item) => (
          <Image src={item.url} alt="其他图片" key={item.id} />
        ))
      }
    </div>
  );
};

export default DescInfo;
