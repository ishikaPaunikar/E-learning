import React from 'react';
import { Calendar, Clock, Trophy, TrendingUp, BookOpen, CheckCircle, Target, Award } from 'lucide-react';
import { Course, User } from '../types';

interface DashboardPageProps {
  courses: Course[];
  user: User;
  onCourseClick: (courseId: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ courses, user, onCourseClick }) => {
  const enrolledCourses = courses.filter(course => course.isEnrolled);
  const totalProgress = enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0);
  const averageProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: user.enrolledCourses,
      color: 'blue',
      change: '+2 this month'
    },
    {
      icon: CheckCircle,
      label: 'Completed Courses',
      value: user.completedCourses,
      color: 'green',
      change: '+1 this month'
    },
    {
      icon: Clock,
      label: 'Learning Hours',
      value: user.totalHours,
      color: 'orange',
      change: '+12 this week'
    },
    {
      icon: TrendingUp,
      label: 'Average Progress',
      value: `${averageProgress}%`,
      color: 'purple',
      change: '+15% improvement'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">Track your learning progress and continue your journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => onCourseClick(course.id)}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-orange-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Activity</h2>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, index) => {
                  const intensity = Math.random();
                  let bgColor = 'bg-gray-100';
                  if (intensity > 0.7) bgColor = 'bg-orange-500';
                  else if (intensity > 0.5) bgColor = 'bg-orange-400';
                  else if (intensity > 0.3) bgColor = 'bg-orange-300';
                  else if (intensity > 0.1) bgColor = 'bg-orange-200';
                  
                  return (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded ${bgColor} hover:scale-110 transition-transform cursor-pointer`}
                      title={`${Math.round(intensity * 100)}% activity`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <div className="w-3 h-3 bg-orange-200 rounded"></div>
                  <div className="w-3 h-3 bg-orange-400 rounded"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <Trophy className="text-yellow-600 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Course Completed</div>
                    <div className="text-sm text-gray-600">Graphic Design Fundamentals</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Target className="text-blue-600 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Weekly Goal</div>
                    <div className="text-sm text-gray-600">5 hours learning streak</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Award className="text-green-600 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Certificate Earned</div>
                    <div className="text-sm text-gray-600">Web Development</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">This Week's Goals</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Complete 3 lessons</span>
                    <span className="font-semibold text-green-600">2/3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Study 10 hours</span>
                    <span className="font-semibold text-orange-600">7/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Practice exercises</span>
                    <span className="font-semibold text-blue-600">4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors">
                  Resume Last Course
                </button>
                <button className="w-full border border-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Browse New Courses
                </button>
                <button className="w-full border border-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  View Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;