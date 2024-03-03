

type Action = "get_ids" | "filter" | "get_items" | "get_fields";
export type Field = "brand" | "price" | "product";

type BrandField = {
    brand: string;
}

type PriceField = {
    price: number;
}

type ProductField = {
    product: string;
}

export type FilterParams = BrandField | PriceField | ProductField;

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
    filter?: FilterParams;
}



export interface ItemType {
    id: string;
    brand?: string | null;
    price?: number | null;
    product?: string;
}