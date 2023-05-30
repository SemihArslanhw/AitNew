import React, { useEffect, useState } from 'react'
import "./ImageViewer.css"
import Viewer from 'react-viewer';
import { ImageProxy } from '../../Api';
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading } from 'react-icons/ai';
import { FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';
import { getClusters } from '../../Api/Cluster/clusterRequests';
import { addLabelToFileService, deleteLabelFromFileService } from '../../Api/File/FileControler';
import { GrClose } from 'react-icons/gr'
import { getFileById } from '../../Api/File/FileService';

function ImageViewer({ setSelectedIndex, selectedIndex, selectedImageData, setIsImageMode, setAllImages, allImages, setSelectedImageData }) {

    const [clusters, setClusters] = useState([]);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [labelsLoading, setLabelsLoading] = useState(false);

    useEffect(() => {
        getAllClusters()
        getFileById(selectedImageData._id).then((res) => {
            setSelectedImageData(res.data)
        }
        ).catch((err) => {
            console.log(err)
        })
    }, [])

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(selectedImageData.winPath)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }
            , 1000)
    }

    const getAllClusters = async () => {
        setClusterLoading(true)
        getClusters().then((res) => {
            setClusters(res.data)
            setClusterLoading(false)
        }).catch((err) => {
            console.log(err)
            setClusterLoading(false)
        })
    }

    const handleOptionsChange = (e) => {
        setLabelsLoading(true)
        addLabelToFileService(selectedImageData._id, e.target.value).then((res) => {
            getFileById(selectedImageData._id).then((res) => {
                setSelectedImageData(res.data)
            }
            ).catch((err) => {
                console.log(err)
            }
            )
        }
        ).catch((err) => {
            console.log(err)
        }
        ).finally(() => {
            setLabelsLoading(false)
        }
        )
    }

    const handleDeleteLabel = (label) => {
        setLabelsLoading(true)
        deleteLabelFromFileService(selectedImageData._id, label).then((res) => {
            getFileById(selectedImageData._id).then((res) => {
                setSelectedImageData(res.data)
            }
            ).catch((err) => {
                console.log(err)
            }
            )
        }
        ).catch((err) => {
            console.log(err)
        }
        ).finally(() => {
            setLabelsLoading(false)
        }
        )
    }


    return (
        <div onClick={(e) => { e.target === e.currentTarget && setIsImageMode(false) }} className='post-component'>
            <div className='post-component-body'>
                <div className='w-full h-full flex-col gap-5 items-center justify-center'>
                    <div className='h-[5%] w-full flex justify-between items-center'>
                        {!selectedImageData.isHidden ?
                            <AiFillEyeInvisible className='cursor-pointer hover:bg-black hover:text-white text-black h-7 w-10 border border-gray-900 rounded-lg' onClick={() => { setIsImageMode(false); }}></AiFillEyeInvisible>
                            :
                            <AiFillEye className='cursor-pointer hover:bg-black hover:text-white text-black h-7 w-10 border border-gray-900 rounded-lg' onClick={() => { setIsImageMode(false); }}></AiFillEye>}
                        <GrClose onClick={(e) => { setIsImageMode(false) }} className='cursor-pointer text-black h-8 mr-2'>X</GrClose>
                    </div>
                    <div className='w-full h-[95%] flex items-center gap-5 justify-center'>
                        <div id="container" className="w-2/3 h-full m-0" />
                        <Viewer
                            onChange={(e, i) => { setSelectedImageData(e); setSelectedIndex(i); }}
                            visible={true}
                            noClose={true}
                            images={allImages.map((image) => { image.src = ImageProxy + image?.thumbnail?.url; return image })}
                            activeIndex={selectedIndex}
                            container={document.getElementById("container")}
                        />

                        <div className='w-1/3 h-full font-bold text-black bg-slate-300 p-2 rounded-lg'>

                            <div className='h-full border rounded-lg w-full flex flex-col bg-slate-300'>
                                <div className='h-3/6 w-full p-3 px-5 flex flex-col justify-between items-center'>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-500 flex justify-between items-center'>
                                            <p>Name</p><p>:</p>
                                        </div>
                                        <h1 title={selectedImageData.name} className='text-ellipsis inline-block whitespace-nowrap overflow-hidden'>{selectedImageData.name}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-500 flex justify-between items-center'>
                                            <p>Width</p><p>:</p>
                                        </div>
                                        <h1>{selectedImageData.width}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-500 flex justify-between items-center'>
                                            <p>Height</p><p>:</p>
                                        </div>
                                        <h1>{selectedImageData.height}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-500 flex justify-between items-center'>
                                            <p>Size</p><p>:</p>
                                        </div>
                                        <h1>{selectedImageData.size}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-500 flex justify-between items-center'>
                                            <p>Path</p><p>:</p>
                                        </div>
                                        <h1 onClick={copyToClipboard} className='cursor-pointer hover:bg-cyan-500 hover:text-white text-cyan-500 p-2 border border-cyan-500 rounded-lg'>{!isCopied ? "Copy Path" : "Copied!"}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                </div>
                                <div className='h-1/6 w-full flex justify-center items-center gap-5 p-2 border-b border-t'>
                                    <p className='text-center text-cyan-500 break-words w-1/5'>Add Labels</p>
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
                                            {clusterLoading ? <p>Loading....</p> : clusters?.map((cluster) => {
                                                return (
                                                    <MenuItem value={cluster.cluster_id}>{cluster.cluster_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='h-2/6 w-full flex flex-col gap-3 p-2 overflow-y-auto items-center'>
                                    {!labelsLoading ? selectedImageData?.ai_prediction?.labels?.map((label) => {
                                        return label !== null && (
                                            <div className='flex bg-slate-500 text-white p-3 rounded-lg justify-between items-center w-full'>
                                                <p className='h-10 flex justify-center items-center'>{label.cluster_name}</p>
                                                <div onClick={() => handleDeleteLabel(label.cluster_id)} className='hover:text-white cursor-pointer rounded-lg hover:bg-slate-400 h-10 px-2 flex items-center'>
                                                    <GrClose className='hover:text-white' />
                                                </div>
                                            </div>
                                        )
                                    })
                                        :
                                        <div className='w-full h-full flex items-center justify-center'><AiOutlineLoading className='animate-spin w-8 h-8' /></div>}
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