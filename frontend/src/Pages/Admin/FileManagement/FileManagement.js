import React, { useEffect } from 'react'
import ProgressBar from '../../../Components/LeftBar/ProgressBar/ProgressBar'
import { AiOutlineClockCircle } from 'react-icons/ai'
import Calender from '../../../Components/FileManagement/Calender/Calender'
import { getConfig } from '../../../Api/Config/ConfigController'

function FileManagement() {

  const socket = new WebSocket("ws://192.168.2.44/wstunnel/")
  const [isCalanderMode, setIsCalenderMode] = React.useState(false)
  const [searchProgress, setSearchProgress] = React.useState(20)
  const [calendarData, setCalendarData] = React.useState([])
  const [Loading, setLoading] = React.useState(false)
  const [currentState , setCurrentState] = React.useState("idle")
  const [extract , setExtract] = React.useState(0)
  const [extractPercantage , setExtractPercantage] = React.useState(0)
  const [extracted , setExtracted] = React.useState(0)
  const [extractedPercantage , setExtractedPercantage] = React.useState(0)
  const [predict , setPredict] = React.useState(0)
  const [predictPercantage , setPredictPercantage] = React.useState(0)
  const [predicted , setPredicted] = React.useState(0)
  const [predictedPercantage , setPredictedPercantage] = React.useState(0)
  const [scan , setScan] = React.useState(0)
  const [scanPercantage , setScanPercantage] = React.useState(0)
  const [scanned , setScanned] = React.useState(0)
  const [scannedPercantage , setScannedPercantage] = React.useState(0)
  const [message , setMessage] = React.useState("")
  const [messageStart , setMessageStart] = React.useState("")
  const [jobs , setJobs] = React.useState([])

  

  const buttons = {
    scan: "scan",
    stopscan: "stopscan",
    extract: "extract",
    stopextract: "stopextract",
    predict: "predict",
    stoppredict: "stoppredict"
  };

  const jobStates = {
    idle: "idle",
    running: "running",
    finished: "finished",
    error: "error"
  };
  
  const leftSection = {
    scanned: "scanned",
    extracted: "extracted",
    predicted: "predicted"
  };

useEffect(() => {
  setLoading(true)
  getConfig().then((res)=>{
        setCalendarData(res?.data?.routineTimes)
  }).finally(()=>{
    setLoading(false)
  })

  socket.onopen = () => {
    console.log("connected")
  }

  socket.onerror = (err) => {
    console.log(err)
  }

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data)
    data.map((item)=>{
      switch (item.type) {
        case "serverStatus" :
           console.log(item)
           setCurrentState(item.currentState)
           setExtract(item.extract)
           setExtractPercantage(item.extractPercentage)
           setExtracted(item.extracted)
            setExtractedPercantage(item.extractedPercentage)
            setPredict(item.predict)
            setPredictPercantage(item.predictPercentage)
            setPredicted(item.predicted)
            setPredictedPercantage(item.predictedPercentage)
            setScan(item.scan)
            setScanPercantage(item.scanPercentage)
            setScanned(item.scanned)
            setScannedPercantage(item.scannedPercentage)
            setJobs(item.jobs)
          break;
            default:
        case "info" : 
          switch (item?.data?.job) {
           case "scan" :
            setMessage(item.data.message)
            setMessageStart("scan")
              break;
           case "extract" :
            setMessage(item.data.message)
            setMessageStart("extract")
              break;
            case "predict" :
            setMessage(item.data.message)
            setMessageStart("predict")
              break;
          }
            }})
   
    }

  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({
      "type": "init",
      "payload": "admin"
          }))})

   return () => {
      socket.close()
    }
  }, [])

  const sendToServer = (socket, payload) => {
    return socket.send(JSON.stringify({
      "type": "click",
      "payload": {
        "button": payload,
      },
    }));
  };
  

  return (
    <div className='w-full h-full text-lg p-5 bg-gray-200'>
      {isCalanderMode && <Calender calenderData={calendarData} setIsCalenderMode={setIsCalenderMode}/>}
      <div className='flex items-center w-full h-full justify-center p-5 bg-slate-300 rounded-lg'>
        <div className='flex flex-col p-5 justify-between gap-3 rounded-lg items-center w-full h-full bg-[#374151]'>
       {Loading ? "loading" : 
       <div className='w-full h-full'>
                    <div className='w-full flex justify-between items-center h-10 px-5'>
              <p></p>
              <h1 className='text-xl font-bold'>FILE MANAGEMENT</h1>
              <div onClick={()=>{setIsCalenderMode(true)}} title='Ayarla' className='p-2 cursor-pointer hover:bg-gray-400 bg-gray-500 rounded-lg'>
              <AiOutlineClockCircle className='w-7 h-7 rounded-lg '/>
              </div>
              
              </div>
            <div className='w-full h-full flex'>
              <div className='w-1/2 font-extrabold h-full border-r-2 p-5 gap-5 flex flex-col'>
                <p className='text-xl h-10 font-bold'>System Status : <span className='text-green-300 font-semibold'>{currentState}</span></p>
                <div className='flex flex-col w-full'>
                  <h1 className='text-lg font-extrabold'>SCAN</h1>
                  <div className='w-full flex gap-3 flex-col h-32 bg-gray-500 rounded-lg p-3'>
                    <p className='text-2xl h-14'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className=''>{scan}/{scanned} Files</p>
                      <div className='flex gap-4'>
                        <p className='text-base'>Last Scan Date :</p>
                        <p className='text-base'>{jobs?.find(e=>e.name === "scan")?.lastRun}</p>
                      </div>
                    </div>
                    <ProgressBar heigth="10" value={scannedPercantage} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className=''>EXTRACT</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-gray-500 rounded-lg p-3'>
                    <p className=' h-14'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='t'>{extract}/{extracted} Files</p>
                      <div className='flex gap-4'>
                        <p className='text-base'>Last extract date :</p>
                        <p className='text-base'>{jobs?.find(e=>e.name === "extract")?.lastRun}</p>
                      </div>
                    </div>
                    <ProgressBar heigth="10" value={extractedPercantage} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className=''>PREDICT</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-gray-500 rounded-lg p-3'>
                    <p className=' h-14'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className=''>{predict}/{predicted} Files</p>
                      <div className='flex gap-4'>
                        <p className='text-base'>Last predict date :</p>
                        <p className='text-base'>{jobs?.find(e=>e.name === "predict")?.lastRun}</p>
                      </div>
                    </div>
                    <ProgressBar heigth="10" value={predictedPercantage} />
                  </div>
                </div>
              </div>
              {/*Right side*/}
              <div className='w-1/2 font-extrabold h-full p-5 gap-5 flex flex-col'>
                <p className='h-10'>{message !== "" && <div>{messageStart} : <span className='text-green-500 font-semibold'> {message}</span></div>}</p>
                <div className='flex flex-col w-full'>
                  <p className=''>SCAN</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-gray-900 rounded-lg p-3'>
                    <p className=' h-14'></p>
                    <div className='w-full flex justify-between items-center'>
                      <p className=''>{scan}/{scanned} Files</p>
                      <div className='flex gap-5'>
                        <button onClick={()=>{sendToServer(socket , buttons.scan)}} className='bg-slate-700 font-sans hover:bg-slate-600 rounded-lg w-32'>Scan</button>
                        <button onClick={()=>{sendToServer(socket , buttons.stopscan)}} className='bg-red-900 rounded-lg w-16 font-bold text-xs'>X</button>
                      </div>
                      
                    </div>
                    <ProgressBar heigth="10" value={scanPercantage} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className=''>EXTRACT</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-gray-900 rounded-lg p-3'>
                    <p className='h-14'></p>
                    <div className='w-full flex justify-between items-center'>
                      <p className=''>{extract}/{extracted} Files</p>
                      <div className='flex gap-5'>
                        <button onClick={()=>{sendToServer(socket , buttons.extract)}} className='bg-slate-700 font-sans hover:bg-slate-600 rounded-lg w-32'>Scan</button>
                        <button onClick={()=>{sendToServer(socket , buttons.stopextract)}} className='bg-red-900 rounded-lg w-16 font-bold text-xs'>X</button>
                      </div>
                    </div>
                    <ProgressBar heigth="10" value={extractPercantage} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className=''>PREDICT</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-gray-900 rounded-lg p-3'>
                    <p className='h-14'></p>
                    <div className='w-full flex justify-between items-center'>
                      <p className=''>{predict}/{predicted} Files</p>
                      <div className='flex gap-5'>
                        <button onClick={()=>{sendToServer(socket , buttons.predict)}} className='bg-slate-700 font-sans hover:bg-slate-600 rounded-lg w-32'>Scan</button>
                        <button onClick={()=>{sendToServer(socket , buttons.stoppredict)}} className='bg-red-900 rounded-lg w-16 font-bold text-xs'>X</button>
                      </div>
                    </div>
                    <ProgressBar heigth="10" value={predictPercantage} />
                  </div>
                </div>
              </div>
              <div>

              </div>
            </div></div>}
            
        </div>
        </div>
    </div>
  )
}

export default FileManagement