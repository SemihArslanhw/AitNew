import React from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import ImageViewer from '../../Components/ImageViewer/ImageViewer'
import { Slider } from '@mui/material'

function FileManagement({dragging , setDragging , handleDragOver}) {

    const handleRef = React.useRef(null)
    const [file, setFile] = React.useState(null)
    const inputRef = React.useRef();
    const [isImageMode, setIsImageMode] = React.useState(false)
    const [selectedImageData, setSelectedImageData] = React.useState()
    const [images, setImages] = React.useState([])
    const [sliderValue, setSliderValue] = React.useState(50)
    const fakeImages = [
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "file:///home/semih/Downloads/d6697d6973ca03101d3dafd1c80a53105b8203f08c4d2471b34f3b2bea5a0c39",
    "file:///home/semih/Downloads/d6697d6973ca03101d3dafd1c80a53105b8203f08c4d2471b34f3b2bea5a0c39"  
    ,"","","","","",""  
  ]

    const handleDragEnd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('drag end')
        setDragging(false)
    }

    const handleDrop = (e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log(e.dataTransfer.files[0])
        setFile(e.dataTransfer.files[0])
        setDragging(false)
    }

  return (
    <div ref={handleRef} onDragEnter={handleDragOver} onDrop={()=> console.log("hi")} className='w-full h-full bg-[#cbd5e1] rounded-lg'>
    {isImageMode && <ImageViewer selectedImageData={selectedImageData} setIsImageMode={setIsImageMode}/>}
    <div className='w-full h-full p-5'>
    <div className='w-full gap-5 h-full flex-col bg-[#cbd5e1] p-5 rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
        {/* <div className='text-[#4a5568] bg-blue-400 rounded-lg flex flex-col w-1/4 h-full items-center justify-center text-2xl font-bold'>Drag and Drop File Or Click Here 
        {file && <img className='max-h-64' src={URL.createObjectURL(file)}></img>}
        <input onChange={(e)=>setFile(e.target.files[0])} id='leftInput' className='hidden' type='file'></input>
        <label className='cursor-pointer ' htmlFor='leftInput'>Click Here</label>
        </div> */}
        {/* Search Header */}
        {/* <div className='w-full h-1/6 flex rounded-lg bg-[#e5e7eb] items-center px-5'>
          <div className='w-40 p-5 bg-slate-300 rounded-lg flex items-center justify-center'>
            <Slider onChange={(e)=>{setSliderValue(e.target.value)}} value={sliderValue} aria-label="Default" valueLabelDisplay="auto" />
          </div>
        
          </div> */}
        <div className='w-full overflow-y-auto gap-5 justify-center flex flex-wrap h-full '>
            {fakeImages.map((image)=>(
             <div className='w-96 object-cover' onClick={()=>{setIsImageMode(true); setSelectedImageData(image)}}>
                    <img src="assets/images/deneme.png"></img>
             </div>
            ))}
        </div>
        </div>
        </div>
    </div>
  )
}

export default FileManagement