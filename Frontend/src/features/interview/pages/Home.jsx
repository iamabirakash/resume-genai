import React, { useState, useRef } from 'react'

import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'



const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFileName, setResumeFileName ] = useState("")

    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleResumeChange = (e) => {
        const file = e.target.files?.[ 0 ]
        setResumeFileName(file ? file.name : "")
    }

    
    if (loading) {
        return (
            <main className='min-h-screen bg-[#020817] text-slate-100 flex items-center justify-center px-4'>
                <h1 className='text-xl md:text-2xl font-semibold'>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top,#0f1b35_0%,#020817_45%,#020617_100%)] text-slate-100 px-4 py-6 md:py-8'>

            {/* Page Header */}
            <header className='max-w-4xl mx-auto text-center mb-6 md:mb-8'>
                <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100'>
                    Create Your Custom <span className='text-pink-500'>Interview Plan</span>
                </h1>
                <p className='mt-2 text-sm md:text-lg text-slate-400 max-w-2xl mx-auto'>
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className='max-w-4xl mx-auto rounded-2xl border border-slate-700/70 bg-[#0b1324]/90 shadow-[0_24px_64px_rgba(0,0,0,0.42)] overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2'>

                    {/* Left Panel - Job Description */}
                    <div className='p-5 md:p-6 border-b md:border-b-0 md:border-r border-slate-700/80'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-pink-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className='text-xl font-bold text-slate-100'>Target Job Description</h2>
                            <span className='ml-auto text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded bg-pink-500/15 text-pink-400 border border-pink-500/30'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='w-full min-h-65 md:min-h-87.5 rounded-xl bg-[#1a2340] border border-slate-700/80 text-slate-200 placeholder:text-slate-500 px-4 py-3 outline-none focus:border-pink-500/70 focus:ring-2 focus:ring-pink-500/30 resize-none'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='mt-2 text-sm text-slate-500 text-right'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Right Panel - Profile */}
                    <div className='p-5 md:p-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-pink-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className='text-xl font-bold text-slate-100'>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='mb-3'>
                            <label className='text-base font-semibold text-slate-100 flex items-center gap-3 mb-2'>
                                Upload Resume
                                <span className='text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded bg-pink-500/15 text-pink-400 border border-pink-500/30'>Best Results</span>
                            </label>
                            <label className='w-full rounded-xl border border-dashed border-pink-500/40 bg-[#1a2340] px-4 py-5 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition-colors' htmlFor='resume'>
                                <span className='text-pink-500 mb-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='text-base font-semibold text-slate-100 text-center'>Click to upload or drag &amp; drop</p>
                                <p className='text-sm text-slate-400 mt-1'>PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' onChange={handleResumeChange} />
                            </label>
                            {resumeFileName && (
                                <p className='mt-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2'>
                                    Attached: <span className='font-semibold'>{resumeFileName}</span> • Ready to upload
                                </p>
                            )}
                        </div>

                        {/* OR Divider */}
                        <div className='flex items-center gap-4 my-4'>
                            <div className='h-px flex-1 bg-slate-700/80' />
                            <span className='text-slate-400 text-sm font-semibold'>OR</span>
                            <div className='h-px flex-1 bg-slate-700/80' />
                        </div>

                        {/* Quick Self-Description */}
                        <div>
                            <label className='block text-lg font-semibold text-slate-100 mb-2' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='w-full h-32 rounded-xl bg-[#1a2340] border border-pink-500/50 text-slate-200 placeholder:text-slate-500 px-4 py-3 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 resize-none'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='mt-4 rounded-xl border border-blue-500/30 bg-blue-500/15 p-4 flex items-start gap-3'>
                            <span className='text-blue-400 shrink-0 mt-0.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p className='text-slate-200 text-sm'>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='border-t border-slate-700/80 px-5 md:px-6 py-4 flex flex-col md:flex-row items-center gap-3 justify-between bg-[#0a1221]'>
                    <span className='text-slate-400 text-sm md:text-base'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-600 to-fuchsia-500 px-5 py-2.5 text-white font-bold text-base hover:from-pink-500 hover:to-fuchsia-400 transition-colors shadow-[0_10px_24px_rgba(236,72,153,0.35)]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {reports.length > 0 && (
                <section className='max-w-4xl mx-auto mt-7'>
                    <h2 className='text-xl font-bold text-slate-100 mb-4'>My Recent Interview Plans</h2>
                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {reports.map(report => (
                            <li key={report._id} className='rounded-xl border border-slate-700/80 bg-[#0b1324]/90 p-4 cursor-pointer hover:border-pink-500/50 transition-colors' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 className='font-semibold text-slate-100'>{report.title || 'Untitled Position'}</h3>
                                <p className='text-sm text-slate-400 mt-1'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-slate-300 mt-2'>Match Score: <span className='font-semibold text-pink-400'>{report.matchScore ?? "--"}%</span></p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='max-w-4xl mx-auto mt-7 flex items-center justify-center gap-8 text-slate-500 text-sm'>
                <a className='hover:text-slate-300 transition-colors' href='#'>Privacy Policy</a>
                <a className='hover:text-slate-300 transition-colors' href='#'>Terms of Service</a>
                <a className='hover:text-slate-300 transition-colors' href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home
