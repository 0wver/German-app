import React, { useState, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, AcademicCapIcon, FireIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import LessonCard from '../components/LessonCard';
import Card from '../components/Card';
import Progress from '../components/Progress';
import Button from '../components/Button';
import { useUserData } from '../contexts/UserDataContext';

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { userData } = useUserData();
  
  // Course categories
  const categories = [
    { name: 'Beginner', color: 'blue' },
    { name: 'Intermediate', color: 'orange' },
    { name: 'Advanced', color: 'purple' },
  ];
  
  // Mapping category index to data key
  const categoryToKey = {
    0: 'beginner',
    1: 'intermediate',
    2: 'advanced',
  };
  
  // Calculate course completion progress
  const courseStats = useMemo(() => {
    const stats = {};
    const categories = ['beginner', 'intermediate', 'advanced'];

    categories.forEach((category) => {
      const courses = userData.courses[category] || [];
      const total = courses.length;
      const completed = courses.filter(
        (lesson) => lesson.progress === 100 || lesson.completed
      ).length;
      const progress = total > 0 ? (completed / total) * 100 : 0;
      stats[category] = { total, completed, progress };
    });

    return stats;
  }, [userData.courses]);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring', stiffness: 260, damping: 20 } }
  };
  
  return (
    <div className="py-8">
      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="icon" className="bg-white/80 dark:bg-dark-200/80 shadow-sm backdrop-blur-sm">
              <ArrowLeftIcon className="h-6 w-6 text-ios-gray-900 dark:text-white" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Courses</h1>
        </div>
      </div>
      
      {/* Progress Overview Section */}
      <motion.section 
        className="mb-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white">Learning Progress</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div variants={item}>
            <Card variant="widgetBlue" className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ios-blue/20 dark:bg-white/10 p-3 rounded-full mb-4">
                  <AcademicCapIcon className="h-8 w-8 text-[#0A84FF] dark:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">Beginner Courses</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-ios-blue dark:text-white">
                    {courseStats.beginner.completed}
                  </span>
                  <span className="text-ios-gray-700 dark:text-white/80 ml-1 font-normal">/ {courseStats.beginner.total}</span>
                </div>
                <Progress value={courseStats.beginner.progress} total={100} className="w-full mt-4" />
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="widgetOrange" className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ios-orange/20 dark:bg-white/10 p-3 rounded-full mb-4">
                  <FireIcon className="h-8 w-8 text-[#FF9500] dark:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">Intermediate Courses</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-ios-orange dark:text-white">
                    {courseStats.intermediate.completed}
                  </span>
                  <span className="text-ios-gray-700 dark:text-white/80 ml-1 font-normal">/ {courseStats.intermediate.total}</span>
                </div>
                <Progress value={courseStats.intermediate.progress} total={100} color="orange" className="w-full mt-4" />
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="widgetPurple" className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ios-purple/20 dark:bg-white/10 p-3 rounded-full mb-4">
                  <CheckBadgeIcon className="h-8 w-8 text-[#AF52DE] dark:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">Advanced Courses</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-ios-purple dark:text-white">
                    {courseStats.advanced.completed}
                  </span>
                  <span className="text-ios-gray-700 dark:text-white/80 ml-1 font-normal">/ {courseStats.advanced.total}</span>
                </div>
                <Progress value={courseStats.advanced.progress} total={100} color="purple" className="w-full mt-4" />
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Course Tabs */}
      <div className="mt-8">
        <Tab.Group 
          selectedIndex={selectedCategory} 
          onChange={setSelectedCategory}
        >
          <Tab.List className="flex p-1 space-x-1 bg-white/80 dark:bg-dark-200/80 rounded-xl backdrop-blur-md mb-8">
            {categories.map((category, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `w-full py-3 text-sm leading-5 font-medium rounded-lg transition-all duration-200
                  ${selected 
                    ? `bg-ios-${category.color} text-white shadow-sm`
                    : 'text-ios-gray-900 dark:text-white hover:bg-white/30 dark:hover:bg-dark-100/30'
                  }`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels>
            {categories.map((category, idx) => (
              <Tab.Panel key={idx}>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {userData.courses[categoryToKey[idx]]?.map((lesson) => (
                    <Card key={lesson.id}>
                      <LessonCard
                        id={lesson.id}
                        title={lesson.title}
                        description={lesson.description}
                        duration={lesson.duration}
                        category={lesson.category}
                        progress={lesson.progress}
                        completed={lesson.completed}
                        locked={lesson.locked}
                      />
                    </Card>
                  ))}
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default CoursesPage;