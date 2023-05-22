import React from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import ImageViewer from '../../Components/ImageViewer/ImageViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Slider } from '@mui/material'

function Search({dragging , setDragging , handleDragOver}) {

    const handleRef = React.useRef(null)
    const [isImageMode, setIsImageMode] = React.useState(false)
    const [selectedImageData, setSelectedImageData] = React.useState()
    const [images, setImages] = React.useState([])
    const [selectedIndex , setSelectedIndex] = React.useState(0)

    const fakeImages = [
      {src:"assets/images/deneme.png", alt:"deneme" , path:"assets/images/deneme.png"},
      {src:"assets/images/deneme.png", alt:"deneme" , path:"assets/images/deneme2.png"},
      {src:"assets/images/desen.png", alt:"deneme" , path:"assets/images/desen.png"},
      {src:"assets/images/deneme.png", alt:"deneme" , path:"assets/images/deneme.png"},
      {src:"assets/images/desen.png", alt:"deneme" , path:"assets/images/desen3.png"},
      {src:"assets/images/deneme.png", alt:"deneme" , path:"assets/images/deneme4.png"},
      {src:"assets/images/desen.png", alt:"deneme" , path:"assets/images/desen6.png"},
      {src:"assets/images/deneme.png", alt:"deneme" , path:"assets/images/deneme7.png"},
  ]

  return (
    <div ref={handleRef} className='w-full h-full bg-[#cbd5e1] rounded-lg'>
    {isImageMode && <ImageViewer selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setSelectedImageData={setSelectedImageData} selectedImageData={selectedImageData} allImages={fakeImages} setIsImageMode={setIsImageMode}/>}
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
            {fakeImages.map((image , i)=>(
                   <LazyLoadImage
                   onDragEnter={handleDragOver}
                   onClick={()=>{setIsImageMode(true);setSelectedImageData(image);setSelectedIndex(i)}}
                   className='w-96 cursor-pointer object-cover'
                   src={image.src} // use normal <img> attributes as props
                   />
            ))}
        </div>
        </div>
        </div>
    </div>
  )
}

export default Search