import { Api } from './baseApi'; // путь до твоего файла с `createApi`

export const userApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginType>({
      query: (body)=>({
        url:'/auth/token/login',
        method:'POST',
        body
      })
    })
  }),
});

export const { useLoginMutation } = userApi;