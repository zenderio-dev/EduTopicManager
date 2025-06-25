interface StudentType{
    fullname:string,
    role:'student'| 'teacher' | 'admin'
    group:string,
    course:number,

}

interface TeacherType{
    fullname:string,
    role:'student'| 'teacher' | 'admin'
    academicTitle:string,
    academicDegree:string,
    jobTitle:string
    
    
}

interface AdminType{
    id:number,
    fullName:string,
    role:'student'| 'teacher' | 'admin'
    
}

interface LoginType{
    username:string
    password:string
}
interface FullStudentType extends StudentType, LoginType{}
interface FullTeacherType extends TeacherType, LoginType{}

interface ThemeType{
    title:string,
    id:number,
    description:string,
    type_work: 'coursework'|'graduatework',
    teacher:number
    status:"waiting_student" | "waiting_confirm" | "confirmed"
    student:StudentType|null
   
}