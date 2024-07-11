import React, {useCallback, useEffect, useState} from 'react';
import {useDeepCompareEffect} from './common';

export const useQueryPagingHook = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [numShow, setNumShow] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(!(skip || params === SKIP_TOKEN));
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [data, setData] = useState<R['data']>();
  const [error, setError] = useState<unknown>();
  const [countRefresh, setCountRefresh] = useState(0);
  const [pageRequest, setPageRequest] = useState(1);
  const [result, setResult] = useState<R>();

  const request = useCallback(
    async (params: A) => {
      try {
        const p = params?.p;
        if (p && p > 1) {
          setIsLoadMore(true);
        } else {
          setIsLoading(true);
        }
        setError(undefined);
        const res = await dispatch(asyncThunk(params)).unwrap();
        const newData = res.current_page > 1 && data ? [...data, ...res.data] : res.data;
        setIsLoading(false);
        setIsLoadMore(false);
        setNumShow(res.per_page);
        setPage(res.current_page);
        setTotal(res.total);
        setTotalPage(res.total_pages);
        setData(newData);
        setResult(res);
        return res;
      } catch (e) {
        setError(e);
        setIsLoading(false);
        setIsLoadMore(false);
      }
    },
    [data, dispatch],
  );

  const refresh = useCallback(() => {
    setCountRefresh(c => c + 1);
  }, []);

  const loadMore = useCallback(() => {
    if (page < totalPage && !isLoading && !isLoadMore && data?.length) {
      setPageRequest(page + 1);
    }
  }, [data?.length, isLoading, isLoadMore, page, totalPage]);

  useDeepCompareEffect(() => {
    if (skip || params === SKIP_TOKEN) {
      return;
    }
    setPageRequest(params?.p || 1);
    request(params);
  }, [skip, params, countRefresh]);

  useEffect(() => {
    if (pageRequest > 1) {
      const _params = params ? {...params, p: pageRequest, limit: numShow} : {p: pageRequest, limit: numShow};
      request(_params as A);
    }
  }, [pageRequest]);

  return {
    total,
    totalPage,
    page,
    numShow,
    isLoading,
    isLoadMore,
    error,
    setData,
    request,
    refresh,
    loadMore,
    data,
    result,
  };
};
