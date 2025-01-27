import {
  COMMIT_PRODUCT_INFO,
  GET_PRODUCT, GET_PRODUCT_TYPES, GET_PRODUCTS, GET_PRODUCTS_BY_ORG_ID,
} from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constance';
import {
  IProduct, TProductQuery, TProductsQuery, TProductTypeQuery,
} from '@/utils/types';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);
  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

// 获取当前定位
export const getPosition = () => new Promise<{ latitude: number; longitude: number }>((r) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    r({ latitude, longitude });
  }, () => {
    r({ latitude: 0, longitude: 0 });
  }, {
    enableHighAccuracy: true, // 是否获取高精确位置
    timeout: 3000,
    maximumAge: 1000 * 60 * 30,
  });
});

/**
 * 获取商品列表接口
 * @param pageNum
 * @param pageSize
 * @param type
 */
export const useProducts = (
  name = '',
  type = '',
) => {
  const pn = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<IProduct[]>([]);
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);
  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中',
    });
    const {
      latitude,
      longitude,
    } = await getPosition();
    const res = await get({
      // 清除缓存，就可以让这个接口不走缓存
      fetchPolicy: 'network-only',
      variables: {
        name,
        type: type === DEFAULT_TYPE ? '' : type,
        latitude,
        longitude,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted() {
        toast.close();
      },
    });
    return res.data?.getProductsForH5.data || [];
  };
  // 向上刷新
  const onRefreshHandler = async () => {
    // 重新初始化设置
    pn.current = 1;
    const res = await init();
    // 防止切换type时，hasMore没有变为默认值
    if (res.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setData(res);
  };
  // 下拉加载
  const loadMoreHandler = async () => {
    // 获取下一页的数据
    const res = await init(pn.current + 1);
    if (res.length > 0) {
      pn.current += 1;
      setHasMore(true);
      setData((old) => [...old, ...res]);
    } else {
      setHasMore(false);
    }
  };
  useEffect(() => {
    onRefreshHandler();
  }, [name, type]);
  return {
    data,
    hasMore,
    onRefresh: onRefreshHandler,
    loadMore: loadMoreHandler,
  };
};

// 根据门店获取推荐商品
export const useProductsByOrgId = (orgId: string) => {
  const { data } = useQuery<TProductsQuery>(
    GET_PRODUCTS_BY_ORG_ID,
    {
      variables: {
        orgId,
      },
    },
  );

  return data?.getProductsByOrgIdForH5.data;
};

// 获取单个商品详情
export const useProductInfo = (id:string) => {
  const { data, loading } = useQuery<TProductQuery>(
    GET_PRODUCT,
    {
      fetchPolicy: 'network-only',
      variables: { id },
    },
  );
  return {
    data: data?.getProductInfo.data,
    loading,
  };
};

// 更新商品库存
export const useUpdateProductInfo = () => {
  const [edit] = useMutation(COMMIT_PRODUCT_INFO);
  const editProduct = async (id:string, params:{ stock:number }) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitProductInfoForH5.code === 200) {
      return {
        status: 'success',
      };
    }
    return {
      status: 'fail',
    };
  };
  return [editProduct];
};
