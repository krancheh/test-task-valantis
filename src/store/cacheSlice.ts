import { createSlice } from "@reduxjs/toolkit";
import { FetchParams, FilterParams, ItemType } from "../types";
import { RootState } from ".";

type CachedItems = {
    [key: string]: ItemType[];
}

type CachedIds = {
    [key: string]: string[];
}

interface IState {
    cachedItems: CachedItems;
    cachedIds: CachedIds;
}

const initialState: IState = {
    cachedItems: {},
    cachedIds: {},
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
        setCachedIds: creators.reducer<[FilterParams, string[]]>((state, action) => {
            const [params, ids] = action.payload;

            try {
                const cacheParams = JSON.stringify(params);
                state.cachedIds[cacheParams] = ids;
            } catch (e) {
                console.log(e);
            }
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
    return [];
}

export const selectCachedIds = (state: RootState, params: FilterParams) => {
    try {
        const cacheParams = JSON.stringify(params);
        return state.cache.cachedIds[cacheParams];
    } catch (e) {
        console.log(e);
    }
    return [];
}

export const { setCachedItems, setCachedIds } = cacheSlice.actions;

export default cacheSlice.reducer;