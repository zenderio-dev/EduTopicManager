export interface BaseRole {
    fullname: string;
    user_id: number;
}

export interface StudentType extends BaseRole {
    group: string;
    course: number;
    role: 'student';
}

export interface TeacherType extends BaseRole {
    academicTitle: string;
    academicDegree: string;
    jobTitle: string;
    Themes: TopicType[];
    role: 'teacher';
}

export interface AdminType extends BaseRole {
    role: 'admin';
}

export interface StudentWithUsername extends StudentType {
    username: string;
}

export interface TeacherWithUsername extends TeacherType {
    username: string;
}

export interface AdminWithUsername extends AdminType {
    username: string;
}

export interface LoginType {
    username: string;
    password: string;
    re_password: string;
}

export type RegisterStudentType = Omit<StudentType, 'user_id'> & LoginType;
export type RegisterTeacherType = Omit<TeacherType, 'user_id'> & LoginType;

export type PatchStudentType = Partial<RegisterStudentType>;
export type PatchTeacherType = Partial<RegisterTeacherType>;

export interface TopicType {
    id:number;
    title: string;
    description: string;
    type_work: "coursework" | "diploma" | "both";
}
export interface FullTopicType extends TopicType {
    status: "ожидается студент" | "ожидает подтверждения" | "подтверждено";
    student: StudentType | null;
}
export type CreateTopicType = Omit<TopicType, 'id'>;
export type PatchTopicType = Partial<FullTopicType>;

export interface ConfirmTopicType {
    confirmed_by_teacher: boolean;
}

export interface TopicListChoiseType { 
    teacher_id: number;
    fullname: string;
    topics: FullTopicType[];
}