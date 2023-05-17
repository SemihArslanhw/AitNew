import React from 'react'
import "./ImageViewer.css"

function ImageViewer({selectedImageData , setIsImageMode , sender}) {

  console.log(selectedImageData)

  return (
    <div onClick={(e)=>{e.target === e.currentTarget && setIsImageMode(false)}} className='post-component'>
        <div className='post-component-body'>
            <div className='post-component-body-left'>
             {/* <img src={ PF + selectedPost.image}></img> */}
            </div>
            <div className='post-component-body-right'>
                <div className='post-component-body-right-top'>
                    {/* <img src={sender.profilePicture}></img> */}
                    {/* <div className='post-component-body-right-top-right'>
                        <p >{sender.username}</p>
                        </div> */}
                    </div>
                    <div className='post-component-body-right-comments'>
                        {/* <h1 style={{margin:0}}>{selectedPost.title}</h1>
                        <p>{selectedPost.content}</p> */}
                    </div>
                    <div className='post-component-body-right-bottom'>

                        </div>
            </div>
            </div>
    </div>
  )
}

export default ImageViewer