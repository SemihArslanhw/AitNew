import React from 'react'
import ProgressBar from '../../../Components/LeftBar/ProgressBar/ProgressBar'
import { AiOutlineLoading } from 'react-icons/ai';


function Jobs({ job, sendToServer }) {

    const jobUpper = job.name.charAt(0).toUpperCase() + job.name.slice(1);


    const jobStates = {
        idle: "idle",
        running: "running",
        finished: "finished",
        error: "error"
    };

    const buttons = {
        scan: [
            "scan",
            "stopscan"
        ],
        extract: [
            "extract",
            "stopextract",
        ],
        predict: [
            "predict",
            "stoppredict",
        ]
    };

    return (
        <div className='flex flex-col w-full'>
            <p className=''>{job.name.toUpperCase()}</p>
            <div className='w-full flex gap-6 flex-col h-fit bg-gray-900 rounded-lg p-3'>
                <div className='text-green-500 h-[28px]'>
                    { 
                     job.currentState 
                     === 
                     jobStates.running ? <div className='text-green-500 flex items-center gap-2'><p>{jobUpper + "ing"}</p><AiOutlineLoading className='animate-spin'/></div>
                     : job.currentState === jobStates.finished ? null 
                     : job.currentState === jobStates.error ? "Error"
                     : "Idle"                    
                    }
                    </div>
                <div className='w-full h-[32px] flex justify-between items-center'>
                    <div className='font-extrabold flex justify-end'>{job.done} <p className='font-bold'>/</p> {job.total} Files</div>
                    <div className='flex gap-5'>
                        <button disabled={job.currentState === jobStates.running} onClick={() => { sendToServer(buttons[job.name][0]) }} className={` font-sans ${job.currentState === jobStates.running ? "bg-slate-800" : "bg-slate-500 hover:bg-slate-700"} rounded-lg w-32`}>{job.currentState !== jobStates.running ? jobUpper : "Waiting..."}</button>
                        <button disabled={job.currentState !== jobStates.running} onClick={() => { sendToServer(buttons[job.name][1]) }} className={`  ${job.currentState !== jobStates.running ? "bg-red-900" : "bg-red-500 hover:bg-red-700"} rounded-lg w-16 font-bold text-xs `} >X</button>
                    </div>

                </div>
                <ProgressBar heigth="10" value={job.percentage} />
            </div>
        </div>
    )
}

export default Jobs