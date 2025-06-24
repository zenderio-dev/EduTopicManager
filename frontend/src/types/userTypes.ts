interface StudentType{
    id:number,
    fullName:string,
    role:'student'| 'teacher' | 'admin'
    profile:{
        group:string,
        course:number,
    }
}

interface TeacherType{
    id:number,
    fullName:string,
    role:'student'| 'teacher' | 'admin'
    profile:{
        academicTitle:string,
        academicDegree:string,
        jobTitle:string
        
    }
}

interface AdminType{
    id:number,
    fullName:string,
    role:'student'| 'teacher' | 'admin'
    profile:{

    }
}

interface LoginType{
    username:string
    password:string
}
interface FullStudentType extends StudentType, LoginType{}