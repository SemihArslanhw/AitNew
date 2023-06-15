import React, { useEffect, useState } from 'react'
import "./ImageViewer.css"
import Viewer from 'react-viewer';
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading } from 'react-icons/ai';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addLabelToFileService, deleteLabelFromFileService, hideFileService, unhideFileService } from '../../Api/File/FileControler';
import { GrClose, GrFormClose } from 'react-icons/gr'
import { getFileById } from '../../Api/File/FileService';
import { getClusters } from '../../Api/Cluster/ClusterController';
import { useEscapeKey } from '../../Hooks/UseEscape';



function ImageViewer({ setSelectedIndex, selectedIndex, selectedImageData, setIsImageMode, allImages, setAllImages, setSelectedImageData }) {

    const [clusters, setClusters] = useState([]);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [labelsLoading, setLabelsLoading] = useState(false);

    useEscapeKey(() => {
        setIsImageMode(false)
    }
    );

    useEffect(() => {
        console.log(selectedImageData)

        selectedImageData.src = selectedImageData?.thumbnail?.url

        getAllClusters()

    }, [])

    const copyToClipboard = (e) => {
        var textField = document.createElement('textarea')
        textField.innerText = selectedImageData.winPath
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }
            , 1000)
        document.body.removeChild(textField)
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
                let temp = allImages
                temp[selectedIndex] = res.data
                setAllImages(temp)
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
                let temp = allImages
                temp[selectedIndex] = res.data
                setAllImages(temp)
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

    const handleHideFile = () => {
        hideFileService(selectedImageData._id).then((res) => {
            setAllImages(allImages.filter((image) => image._id !== selectedImageData._id))
            setIsImageMode(false)
        })
            .catch((err) => { console.log(err) })
    }

    const handleUnHideFile = () => {
        unhideFileService(selectedImageData._id).then((res) => {
            setAllImages(allImages.filter((image) => image._id !== selectedImageData._id))
            setIsImageMode(false)
        })
            .catch((err) => { console.log(err) })
    }

    return (
        <div onClick={(e) => { e.target === e.currentTarget && setIsImageMode(false) }} id='bodyy' className='post-component'>
            <div className='post-component-body'>
                <div className='w-full h-full flex-col gap-5 items-center justify-center'>
                    <div className='h-[5%] w-full flex justify-between items-center'>
                        {!selectedImageData.isHidden ?
                            <AiFillEyeInvisible className='cursor-pointer hover:bg-cyan-500 hover:text-white text-cyan-500 h-7 w-10 border border-cyan-500 rounded-lg' onClick={() => { handleHideFile() }}></AiFillEyeInvisible>
                            :
                            <AiFillEye className='cursor-pointer hover:bg-cyan-500 hover:text-white text-cyan-500 h-7 w-10 border border-cyan-500 rounded-lg' onClick={() => { handleUnHideFile() }}></AiFillEye>}
                        <GrClose onClick={(e) => { setIsImageMode(false) }} className='cursor-pointer text-black h-8 mr-2'>X</GrClose>
                    </div>
                    <div className='w-full h-[95%] flex items-center gap-5 justify-center'>
                        <div id="container" className="w-2/3 h-full m-0" />
                        <Viewer
                            images={[selectedImageData]}
                            visible={true}
                            noClose={true}
                            className=''
                            container={document.getElementById("container")}
                            spinner={() => <AiOutlineLoading className='animate-spin w-8 h-8' />}
                        />

                        <div className='w-1/3 h-full font-bold text-black bg-gray-300 p-2 rounded-lg'>

                            <div className='h-full border rounded-lg w-full flex flex-col bg-gray-300'>
                                <div className='h-3/6 w-full p-3 px-5 flex flex-col justify-between items-center'>
                                    <div className='w-full flex justify-between items-center font-bold'>
                                        <div className='w-20 text-cyan-600 flex justify-between items-center'>
                                            <p>Name</p><p>:</p>
                                        </div>
                                        <h1 title={selectedImageData.name} className='text-ellipsis inline-block whitespace-nowrap overflow-hidden'>{selectedImageData.name}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-600 flex justify-between items-center'>
                                            <p>Width</p><p>:</p>
                                        </div>
                                        <h1>{selectedImageData.width}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-600 flex justify-between items-center'>
                                            <p>Height</p><p>:</p>
                                        </div>
                                        <h1>{selectedImageData.height}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-600 flex justify-between items-center'>
                                            <p>Size</p><p>:</p>
                                        </div>
                                        <h1>{selectedImageData.size}</h1>
                                        <p className='w-3'></p>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='w-20 text-cyan-600 flex justify-between items-center'>
                                            <p>Path</p><p>:</p>
                                        </div>
                                        <h1 onClick={copyToClipboard} className='cursor-pointer hover:bg-cyan-500 hover:text-white text-cyan-600 p-2 border border-cyan-500 rounded-lg'>{!isCopied ? "Copy Path" : "Copied!"}</h1>
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
                                            label="Label"
                                            onChange={handleOptionsChange}
                                            style={{ color: 'white' }}
                                        >
                                            {clusterLoading ? <p>Loading....</p> : clusters?.map((cluster, i) => {
                                                return (
                                                    <MenuItem key={i} value={cluster.cluster_id}>{cluster.cluster_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='h-2/6 w-full flex flex-col gap-3 p-2 overflow-y-auto items-center'>
                                    {!labelsLoading ? selectedImageData?.ai_prediction?.labels?.map((label) => {
                                        return label !== null && (
                                            <div className='flex bg-cyan-600 text-white p-3 rounded-lg gap-2 font-sans font-normal text-sm items-center w-full'>
                                                <div onClick={() => handleDeleteLabel(label.cluster_id)} className='hover:text-white cursor-pointer rounded-lg hover:bg-blue-800 h-10 px-1 flex items-center'>
                                                    <img className='w-4' src='assets/images/close.png'></img>
                                                </div>
                                                <p className='h-10 flex justify-center items-center'>{label.cluster_name}</p>
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