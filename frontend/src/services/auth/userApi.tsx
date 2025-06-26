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
      StudentWithUsername,
      RegisterStudentType | RegisterTeacherType
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
    allTeachers: builder.query<TeacherType[], void>({
      query: () => ({
        url: "/teachers/",
        method: "GET",
      }),
      providesTags: ["Teachers"],
    }),
    getAllInfoUser: builder.query<
      TeacherWithUsername | StudentWithUsername,
      number
    >({
      query: (id) => ({
        url: `/users/${id}/`,
        method: "GET",
      }),
      providesTags: ["Students", "Teachers"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students", "Teachers"],
    }),
    patchUser: builder.mutation<
      TeacherWithUsername | StudentWithUsername,
      { data: PatchStudentType | PatchTeacherType, id:number}
    >({
      query: ({id,data}) => ({
        url: `/users/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Students", "Teachers"],
    }),
  }),
});

export const {
  useLoginMutation,
  useMyAccountQuery,
  useLazyMyAccountQuery,
  useAllStudentsQuery,
  useCreateAccountMutation,
  useAllTeachersQuery,
  useGetAllInfoUserQuery,
  useDeleteUserMutation,
  usePatchUserMutation,
} = userApi;
