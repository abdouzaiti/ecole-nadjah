export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  level?: string; // For students
  subject?: string; // For teachers
}

export interface Course {
  id: string;
  title: string;
  teacherId: string;
  teacherName: string;
  level: string;
  subject: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  duration: string;
  date: string;
}

export interface LiveSession {
  id: string;
  title: string;
  teacherId: string;
  teacherName: string;
  level: string;
  subject: string;
  startTime: string;
  status: 'LIVE' | 'UPCOMING';
}

export interface RegistrationRequest {
  id: string;
  studentName: string;
  parentName: string;
  level: string;
  contact: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
