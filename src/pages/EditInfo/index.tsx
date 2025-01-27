import { Button, Form, ImageUploader, Input } from 'antd-mobile'
import classNames from 'classnames'
import { useUploadOSS } from '@/hooks/useUploadOSS'
import { useUserContext } from '@/hooks/useHook'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_STUDENT_INFO } from '@/graphql/user'
import { showSuccess } from '@/utils'
import style from './index.module.less'

/**
 * 编辑个人信息页面
 */
const EditInfo = () => {
    const { store } = useUserContext()
    const [update] = useMutation(UPDATE_STUDENT_INFO)
    const [form] = Form.useForm()
    useEffect(() => {
        if (!store.tel) return
        form.setFieldsValue({
            tel: store.tel,
            name: store.name,
            desc: store.desc,
            avatar: [
                {
                    url: store.avatar,
                },
            ],
        })
    }, [store])
    const onFinish = async (values: any) => {
        const res = await update({
            variables: {
                params: {
                    ...values,
                    avatar: values?.avatar[0]?.url,
                },
            },
        })
        showSuccess(res.data.commitStudentInfo.message)
    }
    const uploadHandler = useUploadOSS()
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
                className={classNames(style.formPadding)}
                onFinish={onFinish}
                footer={
                    <Button block type="submit" color="primary" size="large">
                        提交
                    </Button>
                }
            >
                <Form.Header>请提交个人信息，都是必填的</Form.Header>
                <Form.Item label="昵称" name="name" rules={[{ required: true }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="手机号" name="tel" rules={[{ required: true }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="头像" name="avatar" rules={[{ required: true }]}>
                    <ImageUploader maxCount={1} upload={uploadHandler} />
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditInfo
