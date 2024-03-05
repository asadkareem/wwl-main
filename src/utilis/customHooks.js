import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setLoading} from "../redux/loader/loaderSlice";
import {useSearchParams} from "react-router-dom";

export function useDataWithPagination(fetchDataAsync, getRequestStatus, getAllData, filter = null, selectedSort = null) {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState(null);
    const [pageNumber, setPageNumber] = useState(searchParams.get('page'));
    const status = useSelector(getRequestStatus);
    const recipes = useSelector(getAllData);
    useEffect(() => {
        if (filter) {
            dispatch(fetchDataAsync({pageNumber, filter, selectedSort}))
        } else {
            dispatch(fetchDataAsync(pageNumber));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, filter, selectedSort]);
    useEffect(() => {
        if (status === 'success') {
            setItems(recipes)
            dispatch(setLoading(false))
        } else if (status === 'failed') {
            dispatch(setLoading(false))
        } else {
            dispatch(setLoading(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return {items, setPageNumber}
}

export function useOnClickOutside(ref, handler) {//TODO : remove duplicate code
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}