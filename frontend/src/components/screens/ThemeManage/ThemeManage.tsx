'use client'

import DropListTrigger from "@/components/DropListTrigger/DropListTrigger";
import ModalCreateTheme from "../Modals/ModalCreateTheme/ModalCreateTheme";
import ModalCreateUsersFromFile from "../Modals/ModalCreateUsersFile/ModalCreateUsersFromFile";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import styles from './ThemeManage.module.scss'
import Themes from "@/components/Themes/Themes";
const themes: ThemeType[] = [
  {
    title: "Автоматизация расчёта заработной платы",
    id: 1,
    description: "Разработка программы для расчёта зарплаты сотрудников с учётом налогов и надбавок.",
    type_work: "coursework",
    teacher: 201,
    status: "waiting_student",
    student: null
  },
  {
    title: "Интеллектуальная система анализа новостных данных",
    id: 2,
    description: "Проект направлен на создание системы, способной собирать, фильтровать и анализировать новостные потоки из различных источников (новостные сайты, RSS, социальные сети) с применением методов обработки естественного языка (NLP) и машинного обучения. Система должна уметь выделять ключевые события, распознавать субъекты и проводить первичную аналитическую обработку текстов.",
    type_work: "graduatework",
    teacher: 202,
    status: "waiting_confirm",
    student: {
      id: 301,
      fullName: "Кирилл Морозов",
      role: "student",
      group: "БИ-20-04",
      course: 4
    }
  },
  {
    title: "Разработка чат-бота для университетской приёмной комиссии",
    id: 3,
    description: "Создание Telegram-бота, способного отвечать на типичные вопросы абитуриентов о поступлении, дедлайнах и необходимых документах. Реализация сценариев общения и подключение базы знаний.",
    type_work: "coursework",
    teacher: 203,
    status: "confirmed",
    student: {
      id: 302,
      fullName: "Анна Кузнецова",
      role: "student",
      group: "БИ-21-01",
      course: 3
    }
  },
  {
    title: "Прогнозирование спроса на продукцию с использованием временных рядов",
    id: 4,
    description: "Цель работы — построить модель прогнозирования продаж на основе исторических данных предприятия. Проект включает в себя анализ временных рядов, очистку и нормализацию данных, выбор и обучение моделей (ARIMA, Prophet, LSTM), а также визуализацию результатов и их интерпретацию в бизнес-контексте. Работа может быть полезна для отделов планирования и логистики.",
    type_work: "graduatework",
    teacher: 204,
    status: "waiting_student",
    student: null
  },
  {
    title: "Сайт-портфолио для начинающего разработчика",
    id: 5,
    description: "Минималистичный сайт-визитка, содержащий проекты, информацию об образовании и навыках.",
    type_work: "coursework",
    teacher: 205,
    status: "waiting_confirm",
    student: {
      id: 303,
      fullName: "София Лебедева",
      role: "student",
      group: "БИ-21-03",
      course: 3
    }
  }
];

const ThemeManage = () => {
  return (
    <div className={styles.container}>

    <DropListTrigger
      actions={[
        {
          name: "Создать тему",
          modal: ({ isOpen, onClose }) => (
            <ModalCreateTheme isOpen={isOpen} onClose={onClose} />
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

      <Themes data={themes}/>

    </div>
    
  );
};

export default ThemeManage;
