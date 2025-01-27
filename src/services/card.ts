import { GET_CARDS, GET_USE_CARDS } from '@/graphql/card'
import { SUBSCRIBE_COURSE } from '@/graphql/schedule'
import { DEFAULT_PAGE_SIZE } from '@/utils/constance'
import { ICardRecord, TBaseQuery, TCardRecordsQuery } from '@/utils/types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Toast } from 'antd-mobile'
import { useRef, useState } from 'react'

// 获取当前消费者的消费卡
export const useCards = () => {
    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState<ICardRecord[]>([])
    console.log('data', data)
    const pn = useRef(1)
    const [get] = useLazyQuery<TCardRecordsQuery>(GET_CARDS)
    const init = async (pageNum = 1) => {
        const toast = Toast.show({
            icon: 'loading',
            content: '加载中',
        })
        const res = await get({
            // 清除缓存，就可以让这个接口不走缓存
            fetchPolicy: 'network-only',
            variables: {
                page: {
                    pageSize: DEFAULT_PAGE_SIZE,
                    pageNum,
                },
            },
            onCompleted() {
                toast.close()
            },
        })
        return res.data?.getCardRecordsForH5.data || []
    }
    const loadMore = async () => {
        // 获取下一页的数据
        const res = await init(pn.current)
        if (res.length > 0) {
            pn.current += 1
            setHasMore(true)
            setData(oldData => [...oldData, ...res])
        } else {
            setHasMore(false)
        }
    }
    return {
        hasMore,
        loadMore,
        data,
    }
}

// 获取用户当前课程可用的消费卡
export const useUserCards = (courseId: string) => {
    const { data, loading } = useQuery<TCardRecordsQuery>(GET_USE_CARDS, {
        variables: {
            courseId,
        },
    })
    return {
        data: data?.getUseCardRecordsByCourse.data,
        loading,
    }
}

// 立即预约课程
export const useSubscribeCourse = () => {
    const [subscribe, { loading }] = useMutation<TBaseQuery>(SUBSCRIBE_COURSE)
    const subscribeHandler = async (scheduleId: string, cardId: string) => {
        const res = await subscribe({
            variables: {
                scheduleId,
                cardId,
            },
        })
        return res.data?.subscribeCourse
    }
    return {
        subscribe: subscribeHandler,
        loading,
    }
}
