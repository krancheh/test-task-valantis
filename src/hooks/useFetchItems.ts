import { RequestBody, ResponseData } from './../types.d';
import { useEffect, useRef, useState } from 'react'
import { ItemType, PaginationType } from '../types';
import $api from '../api';
import getUniqueItems from '../utils/getUniqueItems';

interface IProps {
    paginationModel: PaginationType;
}

const useFetchItems = (props: IProps): [ItemType[], boolean, boolean] => {
    const { paginationModel } = props;

    const [items, setItems] = useState<ItemType[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const refetchTimeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        let isMounted = true;
        setIsFetching(true);

        const fetchItems = async () => {
            try {
                const getIdsBody: RequestBody<PaginationType> = {
                    action: "get_ids",
                    params: paginationModel,
                }

                const idsResponse = await $api.post<ResponseData<string[]>>("/", getIdsBody);
                const ids = idsResponse.data.result;

                const getItemsBody: RequestBody<{ ids: string[] }> = {
                    action: "get_items",
                    params: { ids },
                }

                const itemsResponse = await $api.post<ResponseData<ItemType[]>>("/", getItemsBody);

                // Фильтрация повторяющихся id
                const uniqueItems = getUniqueItems(itemsResponse.data.result);

                setItems(uniqueItems);
                setIsSuccess(true);
            } catch (error: any) {
                setIsSuccess(false);

                // Если компонент существует, то делаем повторный запрос через 1 сек
                if (isMounted) {
                    refetchTimeout.current = setTimeout(fetchItems, 1000);
                }
            } finally {
                setIsFetching(false);
            }
        }

        fetchItems();

        return () => {
            isMounted = false;
            clearTimeout(refetchTimeout.current);
        }
    }, [paginationModel]);

    return [items, isSuccess, isFetching];
}

export default useFetchItems