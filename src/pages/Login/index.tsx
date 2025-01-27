import { Button, Form, Input } from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { STUDENT_LOGIN } from '@/graphql/user';
import { showFail, showSuccess } from '@/utils';
import md5 from 'md5';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { AUTH_TOKEN, basePath } from '@/utils/constance';
import { useUserContext } from '@/hooks/useHook';
import style from './index.module.less';

/**
* 登录页面
*/
const Login = () => {
  const [visible, setVisible] = useState(false);
  const [login] = useMutation(STUDENT_LOGIN);
  const { store } = useUserContext();
  const nav = useNavigate();
  const onFinish = async (values:any) => {
    const res = await login({
      variables: {
        account: values.account,
        password: md5(values.password),
      },
    });
    if (res.data.studentLogin.code === 200) {
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      store.refetchHandler(); // 查询获取用户信息
      nav(`${basePath}/`);
      showSuccess('登录成功');
    } else {
      showFail({ code: res.data.studentLogin.code, message: res.data.studentLogin.message });
    }
  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img
          src="https://water-drop-leo-assets.oss-rg-china-mainland.aliyuncs.com/images/henglogo%402x.png"
          alt=""
        />
      </div>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        footer={(
          <Button type="submit" block color="primary" size="large">
            登录
          </Button>
        )}
      >
        <Form.Item name="account" label="用户名" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          name="password"
          label="输入密码"
          rules={[
            { required: true, message: '密码不能为空' },
            { pattern: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{6}$/, message: '密码长度为6位' },
          ]}
          extra={(
            <div>
              {
                    !visible ? (
                      <EyeInvisibleOutline onClick={() => setVisible(true)} />
                    ) : (
                      <EyeOutline onClick={() => setVisible(false)} />
                    )
                }
            </div>
          )}
        >
          <Input type={visible ? 'text' : 'password'} placeholder="请输入密码" clearable />
        </Form.Item>
      </Form>
      <Link to={`${basePath}/register`}>没有账号，去注册？</Link>
    </div>
  );
};

export default Login;
