"use client";

import { useGetTopicListChoiseQuery } from "@/services/api/topicsApi";
import styles from "./TopicWatch.module.scss";
import CardTeacher from "../ui/CardTeacher/CardTeacher";
import Loader from "../ui/Loader/Loader";

const TopicWatch = () => {
  const { data, isLoading, isError } = useGetTopicListChoiseQuery();
  console.log(data, isLoading, isError);
  if (isLoading) return <Loader color="#000" />;
  if (!data) return <div>Нет тем</div>;
  return (
    <section className={styles.container}>
      {data.map((item) => (
        <CardTeacher
          isLoading={isLoading}
          isError={isError}
          user={item}
        ></CardTeacher>
      ))}
    </section>
  );
};

export default TopicWatch;
