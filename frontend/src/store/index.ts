import { Api } from "@/services/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    

    reducer: {
        [Api.reducerPath]:Api.reducer,
        
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(Api.middleware)
        

    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;