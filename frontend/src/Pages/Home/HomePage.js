import React from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'

function FileManagement() {

    const [dragging, setDragging] = React.useState(false)
    const handleRef = React.useRef(null)
    const [file, setFile] = React.useState(null)
    const inputRef = React.useRef();
    const [images, setImages] = React.useState([])
    const fakeImages = [
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "http://192.168.2.44/media/4989c40c/fdce20099c965803a0998d00b8a7ac8ceaf29f0058fd55e660a0b15442e10601",
    "file:///home/semih/Downloads/d6697d6973ca03101d3dafd1c80a53105b8203f08c4d2471b34f3b2bea5a0c39",
    "file:///home/semih/Downloads/d6697d6973ca03101d3dafd1c80a53105b8203f08c4d2471b34f3b2bea5a0c39"  
    ]

    const handleDragEnd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('drag end')
        setDragging(false)
    }


    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
        console.log('drag over')
    }

    const handleDrop = (e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log(e.dataTransfer.files[0])
        setFile(e.dataTransfer.files[0])
        setDragging(false)
    }

  return (
    <div ref={handleRef} onDragEnter={handleDragOver} onDrop={()=> console.log("hi")} className='w-full h-full p-5 bg-[#cbd5e1] rounded-lg'>
        
    {dragging ? <div onDragLeave={handleDragEnd} onDrop={()=>{console.log("hi")}} className='w-full h-full bg-[#cbd5e1] rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
    <div 
            className="w-full h-full flex flex-col justify-center items-center p-5 bg-[#cbd5e1] rounded-lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <AiOutlineCloudDownload style={{width:"100px",height:"100px"}}/>
            <h1>Drop File to Search</h1>
          <input 
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
            
        </div>
        </div> : <div className='w-full h-full bg-[#cbd5e1] p-5 rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
        <div className='text-[#4a5568] bg-blue-400 rounded-lg flex flex-col w-1/4 h-full items-center justify-center text-2xl font-bold'>Drag and Drop File Or Click Here 
        {file && <img className='max-h-64' src={URL.createObjectURL(file)}></img>}
        <input onChange={(e)=>setFile(e.target.files[0])} id='leftInput' className='hidden' type='file'></input>
        <label className='cursor-pointer ' htmlFor='leftInput'>Click Here</label>
        </div>
        <div className='w-full flex h-full flex-wrap'>
            {fakeImages.map((image)=>(

                    <img className='w-1/4 h-1/4 object-cover' src="assets/images/deneme.png"></img>

            ))}
        </div>
        </div>
        }
    </div>
  )
}

export default FileManagement