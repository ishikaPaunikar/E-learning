import React from 'react';
import { Play, Star, Users, Clock, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onCourseClick: (courseId: string) => void;
  onVideoPlay?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick, onVideoPlay }) => {
  const progressPercentage = course.progress || 0;
  const discount = course.originalPrice ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative" onClick={() => onCourseClick(course.id)}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {onVideoPlay && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVideoPlay(course);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Play className="text-orange-600" size={24} fill="currentColor" />
            </div>
          </button>
        )}
        {course.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {discount}% OFF
          </div>
        )}
        {course.isEnrolled && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Enrolled
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            {course.category}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="font-medium">{course.instructor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen size={14} />
              <span>{course.totalLessons} lessons</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400" size={16} fill="currentColor" />
              <span className="font-semibold">{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users size={14} />
              <span className="text-sm">{course.studentsEnrolled.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {course.isEnrolled && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-semibold text-orange-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {course.completedLessons}/{course.totalLessons} lessons completed
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCourseClick(course.id);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              course.isEnrolled
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {course.isEnrolled ? 'Continue' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;