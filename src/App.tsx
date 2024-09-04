import { useEffect } from 'react'
import { Form, Input, Button, Calendar, ImageUploader } from 'antd-mobile'
import { useQuery, useMutation } from '@apollo/client'
import { FIND, UPDATE } from './graphql/demo'
import { useUploadOSS } from './hooks/useUploadOSS'

import './App.css'

interface FormData {
    name: string
    desc: string
    actor?: any
}
const App = () => {
    const { loading, data } = useQuery(FIND, {
        variables: {
            id: '770a5b65-495f-4f3b-ab28-90c48fd41f89',
        },
    })
    const [update] = useMutation(UPDATE)
    const uploadHandler = useUploadOSS()

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark')
    }, [])

    const onClickHandler = (v: FormData) => {
        update({
            variables: {
                id: '770a5b65-495f-4f3b-ab28-90c48fd41f89',
                params: {
                    ...v,
                },
            },
        })
    }
    return (
        <div>
            <Calendar
                prevMonthButton={<span>上一月</span>}
                nextMonthButton={<span>下一月</span>}
                prevYearButton={<span>上一年</span>}
                nextYearButton={<span>下一年</span>}
            />
            <p>data: {JSON.stringify(data)}</p>
            <p>loading: {loading}</p>
            <Form
                layout="horizontal"
                onFinish={onClickHandler}
                footer={
                    <Button block type="submit" color="primary" size="large">
                        提交
                    </Button>
                }
            >
                <Form.Item name="name" label="姓名">
                    <Input />
                </Form.Item>
                <Form.Item name="desc" label="描述">
                    <Input />
                </Form.Item>
                <Form.Item name="actor" label="头像">
                    <ImageUploader upload={uploadHandler} />
                </Form.Item>
            </Form>
        </div>
    )
}

export default App
