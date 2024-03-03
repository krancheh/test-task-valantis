import { createSlice } from "@reduxjs/toolkit";
import { FetchParams, ItemType } from "../types";
import { RootState } from ".";

type CachedItems = {
    [key: string]: ItemType[];
}

interface IState {
    cachedItems: CachedItems;
    brands: string[];
    totalPages: number;
}

const initialState: IState = {
    cachedItems: {},
    brands: [],
    totalPages: 1,
}


const cacheSlice = createSlice({
    name: "cache",
    initialState,
    reducers: (creators) => ({
        setCachedItems: creators.reducer<[FetchParams, ItemType[]]>((state, action) => {
            const [params, items] = action.payload;

            try {
                const cacheParams = JSON.stringify(params);
                state.cachedItems[cacheParams] = items;
            } catch (e) {
                console.log(e);
            }
        }),
        setBrands: creators.reducer<string[]>((state, action) => {
            state.brands = action.payload;
        }),
        setPages: creators.reducer<number>((state, action) => {
            state.totalPages = action.payload;
        })
    })
})



export const selectCachedItems = (state: RootState, params: FetchParams) => {
    try {
        const cacheParams = JSON.stringify(params);
        return state.cache.cachedItems[cacheParams];
    } catch (e) {
        console.log(e);
    }
    return undefined;
}

export const selectBrands = (state: RootState) => {
    return state.cache.brands;
}

export const selectTotalPages = (state: RootState) => {
    return state.cache.totalPages;
}

export const { setBrands, setCachedItems, setPages } = cacheSlice.actions;

export default cacheSlice.reducer;