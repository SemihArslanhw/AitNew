import React from 'react'
import "./ImageViewer.css"
import Viewer from 'react-viewer';

function ImageViewer({ selectedImageData, setIsImageMode }) {

    const [visible, setVisible] = React.useState(false);


    return (
        <div onClick={(e) => { e.target === e.currentTarget && setIsImageMode(false) }} className='post-component'>
            <div className='post-component-body'>
                <div className='w-full h-full flex items-center gap-5 justify-center'>
                    <img src={selectedImageData} alt='photo' className='w-1/2 hover:scale-95 cursor-pointer transition-all h-full bg-black' onClick={() => { setVisible(true); }}></img>
                    <Viewer
                        visible={visible}
                        onClose={() => { setVisible(false); }}
                        images={[{ src: selectedImageData, alt: 'photo' }]}
                    />
                    <div className='w-1/2 h-full bg-slate-600 rounded-sm'></div>
                </div>
            </div>
        </div>
    )
}

export default ImageViewer