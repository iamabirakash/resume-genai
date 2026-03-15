import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-4 p-5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors' onClick={() => setOpen(o => !o)}>
                <span className='shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold'>Q{index + 1}</span>
                <p className='flex-1 text-gray-800 font-medium'>{item.question}</p>
                <span className={`shrink-0 text-gray-600 transition-transform ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='p-5 space-y-5 bg-white border-t border-gray-200'>
                    <div>
                        <span className='inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3'>Intention</span>
                        <p className='text-gray-700 leading-relaxed'>{item.intention}</p>
                    </div>
                    <div>
                        <span className='inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3'>Model Answer</span>
                        <p className='text-gray-700 leading-relaxed'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='border border-gray-300 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow'>
        <div className='flex items-center gap-3 mb-4'>
            <span className='inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full'>Day {day.day}</span>
            <h3 className='text-lg font-semibold text-gray-900'>{day.focus}</h3>
        </div>
        <ul className='space-y-2'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-3 text-gray-700'>
                    <span className='mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



    if (loading || !report) {
        return (
            <main className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
                <h1 className='text-2xl font-semibold text-gray-800'>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'from-green-400 to-green-600' :
            report.matchScore >= 60 ? 'from-yellow-400 to-yellow-600' : 'from-red-400 to-red-600'


    return (
        <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto'>

                {/* ── Left Nav ── */}
                <nav className='lg:col-span-1'>
                    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                        <p className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4'>Sections</p>
                        <div className='space-y-2 mb-6'>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeNav === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className='text-lg'>{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => { getResumePdf(interviewId) }}
                            className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md'>
                            <svg height="0.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                            Download Resume
                        </button>
                    </div>
                </nav>

                {/* ── Center Content ── */}
                <main className='lg:col-span-2'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-3xl font-bold text-gray-900'>Technical Questions</h2>
                                <span className='px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='space-y-4'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-3xl font-bold text-gray-900'>Behavioral Questions</h2>
                                <span className='px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='space-y-4'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-3xl font-bold text-gray-900'>Preparation Road Map</h2>
                                <span className='px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='space-y-4'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Right Sidebar ── */}
                <aside className='lg:col-span-1'>
                    <div className='bg-white rounded-lg shadow-lg p-6 sticky top-6'>

                        {/* Match Score */}
                        <div className='text-center mb-8'>
                            <p className='text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4'>Match Score</p>
                            <div className={`w-32 h-32 mx-auto rounded-full bg-linear-to-br ${scoreColor} flex flex-col items-center justify-center shadow-lg`}>
                                <span className='text-4xl font-bold text-white'>{report.matchScore}</span>
                                <span className='text-lg text-white'>%</span>
                            </div>
                            <p className='mt-4 text-sm text-gray-600 font-medium'>Strong match for this role</p>
                        </div>

                        <div className='border-t border-gray-200 my-8' />

                        {/* Skill Gaps */}
                        <div>
                            <p className='text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4'>Skill Gaps</p>
                            <div className='flex flex-wrap gap-2'>
                                {report.skillGaps.map((gap, i) => {
                                    const severityStyles = {
                                        critical: 'bg-red-100 text-red-700',
                                        high: 'bg-orange-100 text-orange-700',
                                        medium: 'bg-yellow-100 text-yellow-700',
                                    }
                                    return (
                                        <span key={i} className={`px-3 py-1 text-xs font-semibold rounded-full ${severityStyles[gap.severity] || 'bg-gray-100 text-gray-700'}`}>
                                            {gap.skill}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview
