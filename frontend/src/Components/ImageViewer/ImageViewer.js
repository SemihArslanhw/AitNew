import React, { useEffect, useState } from 'react'
import "./ImageViewer.css"
import Viewer from 'react-viewer';
import { ImageProxy } from '../../Api';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getClusters } from '../../Api/Cluster/clusterRequests';

function ImageViewer({setSelectedIndex, selectedIndex, selectedImageData, setIsImageMode, allImages, setSelectedImageData }) {


    console.log(selectedImageData)

    const [visible, setVisible] = React.useState(false);
    const [clusters, setClusters] = useState([])
    const [clusterLoading, setClusterLoading] = useState(false)

    useEffect(() => {
        getAllClusters()
    }, [])

    const getAllClusters = async () => {
        setClusterLoading(true)
        getClusters().then((res)=>{
          setClusters(res.data)
          setClusterLoading(false)
          console.log(res.data)
        }).catch((err)=>{
          console.log(err)
          setClusterLoading(false)
        })
      }

    const handleOptionsChange = (e) => {
        console.log(e.target.value)
    }


    return (
        <div onClick={(e) => { e.target === e.currentTarget && setIsImageMode(false) }} className='post-component'>
            <div className='post-component-body'>
                <div className='w-full h-full flex-col gap-5 items-center justify-center'>
                    <div className='h-[5%] w-full flex justify-between items-center'>
                        <AiFillEyeInvisible className='cursor-pointer hover:bg-black hover:text-white text-black h-7 w-10 border border-gray-900 rounded-lg' onClick={() => { setIsImageMode(false); }}></AiFillEyeInvisible>
                        <p onClick={(e) => { setIsImageMode(false) }} className='cursor-pointer text-black h-8'>X</p>
                    </div>
                    <div className='w-full h-[95%] flex items-center gap-5 justify-center'>
                        <img src={ImageProxy + selectedImageData.thumbnail.url} alt='photo' className='w-2/3 hover:scale-95 cursor-pointer transition-all max-h-full bg-black' onClick={() => { setVisible(true); }}></img>
                        <Viewer
                            onChange={(e, i) => { setSelectedImageData(e); console.log(i); setSelectedIndex(i); }}
                            visible={visible}
                            onClose={() => { setVisible(false); }}
                            images={allImages}
                            activeIndex={selectedIndex}
                        />
                        <div className='w-1/3 h-full text-black bg-slate-400 p-2 rounded-lg'>

                            <div className='h-full border rounded-lg w-full flex flex-col bg-slate-400'>
                                <div className='h-3/6 w-full p-3 px-5 flex flex-col justify-between items-center'>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-white flex justify-between items-center'>
                                            <p>Name</p><p>:</p> 
                                        </div>
                                        <h1>{selectedImageData.name}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-white flex justify-between items-center'>
                                            <p>Width</p><p>:</p> 
                                        </div>
                                        <h1>{selectedImageData.width}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-white flex justify-between items-center'>
                                            <p>Height</p><p>:</p> 
                                        </div>
                                        <h1>{selectedImageData.height}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-white flex justify-between items-center'>
                                            <p>Size</p><p>:</p> 
                                        </div>
                                        <h1>{selectedImageData.size}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-white flex justify-between items-center'>
                                            <p>Path</p><p>:</p> 
                                        </div>
                                        <h1>{selectedImageData.winpath}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                </div>
                                <div className='h-1/6 w-full flex items-center gap-5 p-2 border-b border-t'>
                                    <p className='text-center break-words w-1/5'>Add Labels</p>
                                    <FormControl fullWidth>
                                        <InputLabel style={{ color: "white" }} id="demo-simple-select-label">Label</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue="Select Label"
                                            label="Role"
                                            onChange={handleOptionsChange}
                                            style={{ color: 'white' }}
                                        >
                                            {clusters?.map((cluster) => {
                                                return (
                                                    <MenuItem value={cluster._id}>{cluster.cluster_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='h-2/6 w-full flex flex-col justify-between items-center'>
                                    {selectedImageData?.ai_prediction?.labels?.map((label) => {
                                        return (
                                            <div className='flex justify-between items-center w-full'>
                                                <p>{label?.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageViewer