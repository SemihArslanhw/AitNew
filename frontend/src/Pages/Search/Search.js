import React, { useEffect} from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import ImageViewer from '../../Components/ImageViewer/ImageViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImageList, ImageListItem, Pagination } from '@mui/material'
import { getAllImagesFull} from '../../Api/File/FileControler';
import { ImageProxy } from '../../Api';
import SearchPagination from '../../Components/Search/SearchPagination/SearchPagination';

function Search({ handleDragStart, mapingType , isSearching , images , setImages }) {

  const handleRef = React.useRef(null)
  const [isImageMode, setIsImageMode] = React.useState(false)
  const [selectedImageData, setSelectedImageData] = React.useState()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [cols , setCols] = React.useState(6)


  useEffect(() => {
    const handleWindowResize = () => {
      if(window.innerWidth < 640){
        setCols(1)
      }else if(window.innerWidth < 768){
        setCols(2)
      }else if(window.innerWidth < 1024){
        setCols(3)
      }else if(window.innerWidth < 1280){
        setCols(4)
      }else if(window.innerWidth < 1536){
        setCols(5)
      }else{
        setCols(6)
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  },[]);

  return (
    <div ref={handleRef} className='w-full h-full bg-[#cbd5e1] rounded-lg'>
      <SearchPagination/>
      {isImageMode && <ImageViewer setAllImages={setImages} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setSelectedImageData={setSelectedImageData} selectedImageData={selectedImageData} allImages={images} setIsImageMode={setIsImageMode} />}
      <div className='w-full h-full p-5'>
        <div className='w-full gap-5 h-full flex-col bg-[#cbd5e1] p-5 rounded-lg border-2 border-[#4a5568] border-dashed flex items-center'>
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
          {isSearching ? <div className='w-full h-full text-black gap-10 flex flex-col items-center justify-center'>
            <AiOutlineLoading className='animate-spin  w-20 h-20' />
            <p>Search is in progress please wait.....</p>
            </div>
            :
            <div className='w-full overflow-y-auto gap-5 flex flex-wrap '>
              <ImageList variant={mapingType}  cols={cols} gap={8}>
                {images?.map((image, i) => (
                  <ImageListItem key={i}>
                    <LazyLoadImage
                      key={i}
                      onDragEnter={handleDragStart}
                      onClick={() => { setIsImageMode(true); setSelectedImageData(image); setSelectedIndex(i) }}
                      className='w-96 cursor-pointer object-cover rounded-md'
                      src={ImageProxy + image.thumbnail.url} // use normal <img> attributes as props
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