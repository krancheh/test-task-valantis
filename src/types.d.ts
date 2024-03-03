

type Action = "get_ids" | "filter" | "get_items" | "get_fields";
export type Field = "brand" | "price" | "product";

export type RequestBody<T> = {
    action: Action;
    params: T;
}

export type ResponseData<T> = {
    result: T;
}

export interface FetchParams {
    offset: number;
    limit: number;
    filter?: {
        [K in Field]: string | number;
    }
}

export interface ItemType {
    id: string;
    brand?: string | null;
    price?: number | null;
    product?: string;
}