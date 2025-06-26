import {
  ConfirmTopicType,
  CreateTopicType,
  FullTopicType,
  PatchTopicType,
  TopicListChoiseType,
} from "@/types/userTypes";
import { Api } from "./baseApi";

export const topicsApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMyTopics: builder.query<FullTopicType, void>({
      query: () => ({
        url: "/topics/my_topics_with_status/",
        method: "GET",
      }),
      providesTags: ["MyTopics"],
    }),
    CreateTopic: builder.mutation<void, CreateTopicType>({
      query: (body) => ({
        url: "/topics/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyTopics"],
    }),
    deleteTopic: builder.mutation<void, number>({
      query: (id) => ({
        url: `/topics/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyTopics"],
    }),
    patchTopic: builder.mutation<void, { id: number; data: PatchTopicType }>({
      query: ({ id, data }) => ({
        url: `/topics/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MyTopics"],
    }),
    confirmTopic: builder.mutation<
      void,
      { id: number; body: ConfirmTopicType }
    >({
      query: ({ id, body }) => ({
        url: `/student-topic-choices/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyTopics"],
    }),
    getTopicListChoise: builder.query<TopicListChoiseType[], void>({
      query: () => ({
        url: "/topics/available_by_teacher/",
        method: "GET",
      }),
      providesTags: ["MyTopicsStudent"],
    }),
    setChoises: builder.mutation<void, { body: { topic: number } }>({
      query: ({ body }) => ({
        url: `/student-topic-choices/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyTopicsStudent"],
    }),
  }),
});
export const {
  useConfirmTopicMutation,
  useDeleteTopicMutation,
  useGetMyTopicsQuery,
  usePatchTopicMutation,
  useCreateTopicMutation,
  useGetTopicListChoiseQuery,
  useSetChoisesMutation,
} = topicsApi;
