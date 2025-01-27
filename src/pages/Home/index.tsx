import { useGoto } from '@/hooks';
import { ROUTE_KEY } from '@/routers/menus';
import { Button, SearchBar } from 'antd-mobile';
import { useProducts } from '@/services/product';
import { useState } from 'react';
import style from './index.module.less';
import TypeSelect from './components/TypeSelect';
import ProductList from './components/ProductList';
/**
* 主页-精品课程
*/
const Home = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const { go } = useGoto();
  useProducts();
  const onSearchHandler = (val:string) => {
    setName(val);
  };
  const onChangeHandler = (key:string) => {
    setType(key);
  };
  return (
    <div className={style.container}>
      <SearchBar placeholder="请输入内容" onSearch={onSearchHandler} />
      <TypeSelect onChange={onChangeHandler} />
      <ProductList name={name} type={type} />
      <Button onClick={() => go(ROUTE_KEY.EDIT_INFO)} style={{ display: 'none' }}>去往编辑个人信息</Button>
    </div>
  );
};

export default Home;
