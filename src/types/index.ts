export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  thumbnail: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsEnrolled: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  isEnrolled?: boolean;
  totalLessons: number;
  completedLessons?: number;
  videoUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: number;
  completedCourses: number;
  totalHours: number;
  joinDate: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
}