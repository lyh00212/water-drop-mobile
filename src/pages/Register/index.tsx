import { Button, Form, Input } from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { STUDENT_REGISTER } from '@/graphql/user';
import { showFail, showSuccess } from '@/utils';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { basePath } from '@/utils/constance';
import style from './index.module.less';

/**
* 注册页面
*/
const Register = () => {
  const [form] = Form.useForm();
  const [run] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();
  // const registerHandler = (values:any) => {
  //   const { password, passwordConfirm } = values;
  //   if (password !== passwordConfirm) {
  //     return showFail({ code: '500', message: '两次密码输入不一致' });
  //   }
  // };
  const onFinish = async (values:any) => {
    const res = await run({
      variables: {
        account: values.account,
        password: md5(values.password),
      },
    });
    if (res.data.studentRegister.code === 200) {
      nav(`${basePath}/login`);
      showSuccess('注册成功');
    } else {
      showFail({ code: res.data.studentRegister.code, message: res.data.studentRegister.message });
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
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        footer={(
          <Button type="submit" block color="primary" size="large">
            注册
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
        >
          <Input placeholder="请输入密码" clearable />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="确认密码"
          rules={[
            { required: true, message: '密码不能为空' },
            { pattern: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{6}$/, message: '密码长度为6位' },
            {
              validator: (_, value) => {
                const password = form.getFieldValue('password');
                if (password === value) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: '两次输入的密码需要一致',
            },
          ]}
        >
          <Input placeholder="请再次输入密码" clearable />
        </Form.Item>
      </Form>
      <Link to={`${basePath}/login`}>返回登录页面</Link>
    </div>
  );
};

export default Register;
