import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cacheReducer from "./cacheSlice";



export const store = configureStore({
    reducer: {
        cache: cacheReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
type Dispatch = () => AppDispatch;

export const useAppDispatch: Dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;