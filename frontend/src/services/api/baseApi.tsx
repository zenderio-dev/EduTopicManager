import { createApi,  fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers)=>{
        const token = Cookies.get('token');
        if (token) headers.set("Authorization", `Token ${token}`);
        return headers;
        },
    }),
     tagTypes: ["Students", 'Teachers', 'MyTopics', 'MyTopicsStudent'],
    endpoints: () => ({})
})
    

