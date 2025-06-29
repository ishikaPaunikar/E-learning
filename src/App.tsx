import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';
import VideoPlayer from './components/VideoPlayer';
import { courses, userData } from './data/courses';
import { Course } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [coursesData, setCoursesData] = useState(courses);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleCourseClick = (courseId: string) => {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      if (course.isEnrolled && course.videoUrl) {
        setShowVideoPlayer(true);
      } else {
        // In a real app, this would navigate to course details or enrollment
        console.log('Course clicked:', course.title);
      }
    }
  };

  const handleVideoPlay = (course: Course) => {
    setSelectedCourse(course);
    setShowVideoPlayer(true);
  };

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false);
    setSelectedCourse(null);
  };

  const handleProgressUpdate = (courseId: string, progress: number) => {
    setCoursesData(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, progress: Math.max(course.progress || 0, progress) }
          : course
      )
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            courses={coursesData}
            onCourseClick={handleCourseClick}
            onVideoPlay={handleVideoPlay}
            onPageChange={handlePageChange}
          />
        );
      case 'courses':
        return (
          <CoursesPage
            courses={coursesData}
            onCourseClick={handleCourseClick}
            onVideoPlay={handleVideoPlay}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            courses={coursesData}
            user={userData}
            onCourseClick={handleCourseClick}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={userData}
            courses={coursesData}
          />
        );
      default:
        return (
          <HomePage
            courses={coursesData}
            onCourseClick={handleCourseClick}
            onVideoPlay={handleVideoPlay}
            onPageChange={handlePageChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      {renderCurrentPage()}
      
      {showVideoPlayer && selectedCourse && (
        <VideoPlayer
          course={selectedCourse}
          onClose={handleCloseVideoPlayer}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
    </div>
  );
}

export default App;