import React from 'react';
import { BookOpen, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface HomePageProps {
  courses: Course[];
  onCourseClick: (courseId: string) => void;
  onVideoPlay: (course: Course) => void;
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ courses, onCourseClick, onVideoPlay, onPageChange }) => {
  const featuredCourses = courses.slice(0, 3);
  const stats = [
    { icon: BookOpen, label: 'Courses Available', value: '500+' },
    { icon: Users, label: 'Active Students', value: '50,000+' },
    { icon: Award, label: 'Certificates Issued', value: '25,000+' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Future with
              <span className="block text-yellow-300">Expert-Led Courses</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of Indians mastering new skills. Learn from industry experts, 
              earn certificates, and advance your career with GyaanMitra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onPageChange('courses')}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Explore Courses
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button 
                onClick={() => onPageChange('dashboard')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-orange-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked courses designed by industry experts to help you master in-demand skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onCourseClick={onCourseClick}
                onVideoPlay={onVideoPlay}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onPageChange('courses')}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-flex items-center"
            >
              View All Courses
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose GyaanMitra */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GyaanMitra?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of real-world experience
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certified Learning</h3>
              <p className="text-gray-600">
                Earn recognized certificates upon successful course completion
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
              <p className="text-gray-600">
                95% of our students report career advancement within 6 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;