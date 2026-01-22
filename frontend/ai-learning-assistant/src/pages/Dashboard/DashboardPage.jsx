import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import progressService from '../../services/progressService'
import toast from 'react-hot-toast'
import { BookOpen, BrainCircuit, Clock, FileText, TrendingUp } from 'lucide-react'

const DashboardPage = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data___getDashboard", data);
        setDashboardData(data.data);
      } catch (error) {
        toast.error('Failed to fecth dashboard data.');
        console.error(error);
      } finally {
        setLoading(false)
      }
    };
    fetchDashboardData();
  }, []);

  if(loading){
    return <Spinner />
  }

  if(!dashboardData || !dashboardData.overview){
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <TrendingUp className='w-8 h-8 text-slate-400' />
          </div>
          <p className="text-slate-600 text-sm">No Dashboard Data Available.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Documents',
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      gradient: 'from-blue-400 to-cyan-500',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      gradient: 'from-purple-400 to-pink-500',
      shadowColor: 'shadow-purple-500/25'
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      gradient: 'from-emerald-400 to-teal-500',
      shadowColor: 'shadow-emerald-500/25'
    }
  ];


  return (
    <div className="">
      <div className="">

        <div className="">

          {/* Header */}
          <div className="">
            <h1 className="">Dashboard</h1>
            <p className="">Track your learning progress activity</p>
          </div>

          {/* Stats Grid */}
          <div className="">
              {stats.map((stat, index) => (
                <div className="" key={index}>
                  <div className="">
                    <span className="">{stat.label}</span>
                    <div className={` w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} >
                        <stat.icon className='' strokeWidth={2} />
                    </div>
                  </div>
                  <div className="">
                    {stat.value}
                  </div>
                </div>
              ))}
          </div>

          {/* Recent Activity Section */}
          <div className="">

            <div className="">
              <div className="">
                <Clock className='' strokeWidth={2} />
              </div>
              <h3 className="">
                Recent Activity
              </h3>
            </div>

            { dashboardData.recentActivity && ( dashboardData.recentActivity.documents.length > 0 || dashboardData.recentActivity.quizzes.length > 0 ) ? (
              <div className="">
                {[
                  ...(dashboardData.recentActivity.documents || []).map(doc => ({
                    id: doc._id,
                    description: doc.title,
                    timestamp: doc.lastAccessed,
                    link: `/documents/${doc._id}`,
                    type: 'documents'
                  })),
                  ...(dashboardData.recentActivity.quizzes || []).map(quiz => ({
                    id: quiz._id,
                    description: quiz.title,
                    timestamp: quiz.lastAttempted,
                    link: `/quizzes/${quiz._id}`,
                    type: 'quiz'
                  }))
                ]
                  .sort((a, b) => new Date())
                
                
                
                
                }
              </div>
            ) }


          </div>

        </div>

      </div>
    </div>
  )
}

export default DashboardPage