import { useEffect, useRef, useState } from "react";
import { Field, RequestBody, ResponseData } from "../types";
import $api from "../api";


const useFetchFields = () => {
    const [fields, setFields] = useState<Field[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const refetchTimeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchFiltersAndBrands = async () => {
            try {
                if (!fields.length) {
                    setIsFetching(true);
                    const response = await $api.post<ResponseData<Field[]>>("/", { action: "get_fields" });  // Запрос на получение fields
                    setFields(response.data.result.filter(field => field !== "product"));
                }

                if (!brands.length) {
                    const body: RequestBody<{ field: Field }> = { action: "get_fields", params: { field: "brand" } }   // Запрос на получение всех брендов
                    const response = await $api.post<ResponseData<string[] | null[]>>("/", body);

                    if (!response.data.result) {
                        return refetchTimeoutRef.current = setTimeout(() => {
                            fetchFiltersAndBrands();
                        }, 1000)
                    }

                    const uniqueBrands = new Set(response.data.result);
                    setBrands(Array.from(uniqueBrands));
                }
            } catch (e) {
                if (isMounted) {
                    refetchTimeoutRef.current = setTimeout(() => {
                        fetchFiltersAndBrands();
                    }, 1000)
                }
            } finally {
                setIsFetching(false);
            }
        }

        fetchFiltersAndBrands();

        // unMount
        return () => {
            isMounted = false;
            clearTimeout(refetchTimeoutRef.current);
        }
    }, [])

    return { fields, brands, isFetching }
}

export default useFetchFields