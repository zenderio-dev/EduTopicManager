interface BaseRole{
    fullname: string;
   
    user_id:number
}

interface StudentType extends BaseRole {
    
    group:string,
    course:number,
    role: 'student',
}

interface TeacherType extends BaseRole {
    academicTitle:string,
    academicDegree:string,
    jobTitle:string,
    Themes:ThemeType[],
    role: 'teacher',
    
}

interface AdminType extends BaseRole {
    role: 'admin',
}

interface StudentWithUsername extends StudentType {
    username: string;
}

interface TeacherWithUsername extends TeacherType {
    username: string;
}
interface AdminWithUsername extends AdminType {
    username: string;
}




interface LoginType{
    username:string
    password:string
    re_password:string
}

type RegisterStudentType = Omit<StudentType, 'id'> & LoginType;
type RegisterTeacherType = Omit<TeacherType, 'id'> & LoginType;

type PatchStudentType = Partial<RegisterStudentType>;
type PatchTeacherType = Partial<RegisterTeacherType>;




interface ThemeType{
    title:string,
    id:number,
    description:string,
    type_work: 'coursework'|'graduatework',
    teacher:TeacherType|null,
    status:"waiting_student" | "waiting_confirm" | "confirmed"
    student:StudentType|null
   
}



