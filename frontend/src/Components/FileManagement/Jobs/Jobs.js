import React from 'react'
import ProgressBar from '../../../Components/LeftBar/ProgressBar/ProgressBar'


function Jobs({ job , sendToServer}) {

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
        ],

    };

    return (
        <div className='flex flex-col w-full'>
            <p className=''>{job.name}</p>
            <div className='w-full flex gap-3 flex-col h-32 bg-gray-900 rounded-lg p-3'>
                <p className=' h-14'></p>
                <div className='w-full flex justify-between items-center'>
                    <p className=''>{job.left}/{job.total} Files</p>
                    <div className='flex gap-5'>
                    </div>

                </div>
                <ProgressBar heigth="10" value={0} />
            </div>
        </div>
    )
}

export default Jobs