'use client'

import DropListTrigger from "@/components/DropListTrigger/DropListTrigger";
import ModalCreateTopic from "../Modals/ModalCreateTopic/ModalCreateTheme";
import ModalCreateUsersFromFile from "../Modals/ModalCreateUsersFile/ModalCreateUsersFromFile";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import styles from './TopicManage.module.scss';
import Topics from "@/components/Topics/Topics";
import { useGetMyTopicsQuery } from "@/services/api/topicsApi";
import Loader from "@/components/ui/Loader/Loader";


const TopicManage = () => {
  const { data, isLoading, isError } = useGetMyTopicsQuery();

  return (
    <div className={styles.container}>
      <DropListTrigger
        actions={[
          {
            name: "Создать тему",
            modal: ({ isOpen, onClose }) => (
              <ModalCreateTopic isOpen={isOpen} onClose={onClose} />
            ),
          },
          {
            name: "Выгрузить с файла",
            modal: ({ isOpen, onClose }) => (
              <ModalCreateUsersFromFile isOpen={isOpen} onClose={onClose} />
            ),
          },
        ]}
      >
        <MyBtn className={styles.btn}>Создать</MyBtn>
      </DropListTrigger>

      {isLoading && <Loader color="#000"/>}
      {isError && <p>Ошибка загрузки тем</p>}
      {data && <Topics data={Array.isArray(data) ? data : [data]} />}
    </div>
  );
};

export default TopicManage;
