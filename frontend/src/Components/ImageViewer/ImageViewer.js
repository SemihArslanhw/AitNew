import React from 'react'
import "./ImageViewer.css"
import Viewer from 'react-viewer';

function ImageViewer({setSelectedIndex , selectedIndex , selectedImageData, setIsImageMode , allImages , setSelectedImageData }) {

    const [visible, setVisible] = React.useState(false);

    return (
        <div onClick={(e) => { e.target === e.currentTarget && setIsImageMode(false) }} className='post-component'>
            <div className='post-component-body'>
                <div className='w-full h-full flex items-center gap-5 justify-center'>
                    <img src={selectedImageData} alt='photo' className='w-1/2 hover:scale-95 cursor-pointer transition-all h-full bg-black' onClick={() => { setVisible(true); }}></img>
                    <Viewer
                        onChange={(e , i) => { setSelectedImageData(e); console.log(i); setSelectedIndex(i); }}
                        visible={visible}
                        onClose={() => { setVisible(false); }}
                        images={allImages}
                        activeIndex={selectedIndex}
                    />
                    <div className='w-1/2 h-full bg-slate-600 p-5 rounded-sm'>
                        <div className='w-full h-[5%] flex justify-between'>
                            <p>Image Name</p>
                            
                        </div>
                        <div className='h-[95%] rounded-lg w-full flex flex-col p-5 bg-slate-400'>
                            <p>Path : {selectedImageData.path}</p>
                            <p>Size : 1.5 MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageViewer