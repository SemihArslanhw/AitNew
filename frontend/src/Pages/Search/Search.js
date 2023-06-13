import React, { useEffect} from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import ImageViewer from '../../Components/ImageViewer/ImageViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImageList, ImageListItem } from '@mui/material'


function Search({ handleDragOver , handleDragStart, mapingType , isSearching , images , setImages }) {

  const handleRef = React.useRef(null)
  const [isImageMode, setIsImageMode] = React.useState(false)
  const [selectedImageData, setSelectedImageData] = React.useState()
  const [selectedIndex, setSelectedIndex] = React.useState(2)
  const [cols , setCols] = React.useState(7)
  const [showingImages , setShowingImages] = React.useState([])


  useEffect(() => {
    const handleWindowResize = () => {
      if(window.innerWidth < 640){
        setCols(1)
      }else if(window.innerWidth < 768){
        setCols(1)
      }else if(window.innerWidth < 1024){
        setCols(2)
      }else if(window.innerWidth < 1280){
        setCols(3)
      }else if(window.innerWidth < 1536){
        setCols(5)
      }else{
        setCols(7)
      }
    };
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    };
  },[]);

  const getImages = (selectedImg) => {
    setSelectedImageData(selectedImg)
    const temp = images
    console.log(images)
    temp.filter((image) => image._id === selectedImg._id).src = selectedImg?.thumbnail?.url
    console.log(temp)
    setShowingImages(temp.slice())
    }

  return (
    <div ref={handleRef} className='w-full h-full p-5 px-10 bg-slate-200'>
      {isImageMode && <ImageViewer setAllImages={setImages} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setSelectedImageData={setSelectedImageData} selectedImageData={selectedImageData} allImages={images} showingImages={showingImages} setIsImageMode={setIsImageMode} />}
      <div className='w-full h-full bg-slate-300 rounded-lg p-4'>
        <div className='w-full gap-5 h-full flex-col bg-gray-700 p-2 rounded-lg border-2 border-[#4a5568] flex items-center'>
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
          {/* Search Body */}
          {isSearching ? <div className='w-full h-full text-white gap-10 flex flex-col items-center justify-center'>
            <AiOutlineLoading className='animate-spin  w-20 h-20' />
            <p>Search is in progress please wait.....</p>
            </div>
            :
            <div className='w-full overflow-y-auto gap-5 flex flex-wrap '>
              {images?.length === 0 && <p className='text-xl p-10'>No Files Founded !</p>}
              <ImageList variant={mapingType}  cols={cols} gap={8}>
                {images?.map((image, i) => ( 
                  <ImageListItem key={i}>
                    <LazyLoadImage
                      tabIndex={i}
                      key={i}
                      onClick={() => { setIsImageMode(true); setSelectedIndex(i);setSelectedImageData(image.src = image.thumbnail.url) ; getImages(image) }}
                      className='w-96 cursor-pointer object-cover rounded-md'
                      src={ image.thumbnail.url} // use normal <img> attributes as props
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Search