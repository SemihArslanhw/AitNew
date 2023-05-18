import React from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import ImageViewer from '../../Components/ImageViewer/ImageViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Slider } from '@mui/material'

function FileManagement({dragging , setDragging , handleDragOver}) {

    const handleRef = React.useRef(null)
    const [file, setFile] = React.useState(null)
    const inputRef = React.useRef();
    const [isImageMode, setIsImageMode] = React.useState(false)
    const [selectedImageData, setSelectedImageData] = React.useState()
    const [images, setImages] = React.useState([])

    const fakeImages = [
    "https://as1.ftcdn.net/v2/jpg/02/19/32/64/1000_F_219326457_xXQLDuA44RjxiabLzNKyff4KFD6EzhDm.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/19/32/64/1000_F_219326457_xXQLDuA44RjxiabLzNKyff4KFD6EzhDm.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/19/32/64/1000_F_219326457_xXQLDuA44RjxiabLzNKyff4KFD6EzhDm.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/19/32/64/1000_F_219326457_xXQLDuA44RjxiabLzNKyff4KFD6EzhDm.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/19/32/64/1000_F_219326457_xXQLDuA44RjxiabLzNKyff4KFD6EzhDm.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/19/32/64/1000_F_219326457_xXQLDuA44RjxiabLzNKyff4KFD6EzhDm.jpg",
    "https://as1.ftcdn.net/v2/jpg/00/96/92/30/1000_F_96923054_xIpJXwMGU5bJZ8v0tcp2PsQaarU2ZCeM.jpg",
    "https://as1.ftcdn.net/v2/jpg/00/96/92/30/1000_F_96923054_xIpJXwMGU5bJZ8v0tcp2PsQaarU2ZCeM.jpg",
    "https://as1.ftcdn.net/v2/jpg/00/96/92/30/1000_F_96923054_xIpJXwMGU5bJZ8v0tcp2PsQaarU2ZCeM.jpg",
    "https://slp-statics.astockcdn.net/static_assets/staging/21spring/photos/featured-categories/card-8.webp",
    "https://slp-statics.astockcdn.net/static_assets/staging/21spring/photos/featured-categories/card-8.webp",
    "https://slp-statics.astockcdn.net/static_assets/staging/21spring/photos/featured-categories/card-8.webp"
  ]

  return (
    <div ref={handleRef} onDrop={()=> console.log("hi")} className='w-full h-full bg-[#cbd5e1] rounded-lg'>
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
        <div className='w-full overflow-y-auto gap-5 justify-center flex flex-wrap '>
            {fakeImages.map((image)=>(
                   <LazyLoadImage
                   onDragEnter={handleDragOver}
                   onClick={()=>{setIsImageMode(true);setSelectedImageData(image)}}
                   className='w-96'
                   src="assets/images/deneme.png" // use normal <img> attributes as props
                   />
            ))}
        </div>
        </div>
        </div>
    </div>
  )
}

export default FileManagement