import CreateStudentForm from "@/components/screens/Modals/CreateStudentForm/CreateStudentForm";
import { Api } from "./baseApi"; // путь до твоего файла с `createApi`
import { use } from "react";

export const userApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ auth_token: string }, LoginType>({
      query: (body) => ({
        url: "/auth/token/login",
        method: "POST",
        body,
      }),
    }),
    CreateAccount: builder.mutation<
      FullStudentType | FullTeacherType,
      LoginType
    >({
      query: (body) => ({
        url: "/users/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students", "Teachers"],
    }),
    myAccount: builder.query<AdminType | TeacherType | StudentType, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    allStudents: builder.query<StudentType[], void>({
      query: () => ({
        url: "/students",
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
     allTeachers: builder.query<StudentType[], void>({
      query: () => ({
        url: "/teachers/",
        method: "GET",
      }),
      providesTags: ["Teachers"],
    }),
  }),
});

export const {
  useLoginMutation,
  useMyAccountQuery,
  useLazyMyAccountQuery,
  useAllStudentsQuery,
  useCreateAccountMutation,
  useAllTeachersQuery
} = userApi;
