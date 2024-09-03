import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { FIND, UPDATE } from './graphql/demo'

import './App.css'

const App = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const { loading, data } = useQuery(FIND, {
        variables: {
            id: '770a5b65-495f-4f3b-ab28-90c48fd41f89',
        },
    })
    const [update] = useMutation(UPDATE)

    const onChangeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const onChangeDescHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }
    const onClickHandler = () => {
        update({
            variables: {
                id: '770a5b65-495f-4f3b-ab28-90c48fd41f89',
                params: {
                    name,
                    desc,
                },
            },
        })
    }
    return (
        <div>
            <p>data: {JSON.stringify(data)}</p>
            <p>loading: {loading}</p>
            <p>
                name:
                <input onChange={onChangeNameHandler} />
            </p>
            <p>
                desc:
                <input onChange={onChangeDescHandler} />
            </p>
            <p>
                <button type="button" onClick={onClickHandler}>
                    更新
                </button>
            </p>
        </div>
    )
}

export default App
