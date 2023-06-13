import React, { cloneElement, useCallback, useEffect } from 'react'
import { AiOutlineCloudDownload, AiOutlineCluster, AiOutlineLoading } from 'react-icons/ai'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { MdImageSearch } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { Checkbox, FormControlLabel, LinearProgress } from '@mui/material'
import * as API from '../../Api/index'
import { filterByLabel, getAllImagesFull, getHiddenFilesService, searchByFileNameService, uploadFileService } from '../../Api/File/FileControler'
import SearchPagination from '../../Components/Search/SearchPagination/SearchPagination';
import {useDropzone} from 'react-dropzone'
import { addCluster, getClusters } from '../../Api/Cluster/ClusterController'


function LeftBar({ children }) {

  const [mapingType, setMapingType] = React.useState('masonry')
  const [images, setImages] = React.useState([])
  const [clusterLoading, setClusterLoading] = React.useState(false)
  const [isSearching, setIsSearching] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const [clusters, setClusters] = React.useState([])
  const [isClusterOpen, setIsClusterOpen] = React.useState(false)
  const [clusterName, setClusterName] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(1)

  useEffect(() => {
    getAllClusters()

  }, [])

  useEffect(() => {
    getPage()
  }, [page])

  const getPage = async () => {
    const modifiedData = clusters.map(obj => ({ ...obj, checked: false }));
    setClusters(modifiedData);

    setIsSearching(true)
    getAllImagesFull(page).then((res) => {
      setTotalPage(res.data.pages)
      setImages(res.data.files)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsSearching(false)
    }
    )
  }

  const getAllClusters = async () => {
    setClusterLoading(true)
    getClusters().then((res) => {
      const modifiedData = res.data.map(obj => ({ ...obj, checked: false }));
      setClusters(modifiedData);
      setClusterLoading(false)
    }).catch((err) => {
      console.log(err)
      setClusterLoading(false)
    })
  }

  const getHiddenImages = async (page) => {
    setIsSearching(true)
    getHiddenFilesService(page).then((res) => {
      setImages(res.data.files)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsSearching(false)
    }
    )

  }

  const deleteCluster = async (id) => {
    setClusterLoading(true)

    await API.deleteCluster(id).then((res) => {
      var temp = clusters
      temp = temp.filter((cluster) => cluster.cluster_id !== id)
      setClusters(temp.slice())
    }).catch((err) => {
      console.log(err)
    })
    setClusterLoading(false)
  }

  const search = async (file) => {

    setIsSearching(true)
    if (file) {
      uploadFileService(file).then((res) => {
        console.log(res)
      }
      ).catch((err) => {
        console.log(err)
      })
    }
  }

  const addClusterr = async (name) => {
    setClusterLoading(true)
    await addCluster(name).then((res) => {
      res.data.checked = false
      setClusters([...clusters, res.data])
    }).catch((err) => {
      console.log(err)
    })
    setClusterLoading(false)
  }

  const searchByFileName = async (page, name) => {
    const modifiedData = clusters.map(obj => ({ ...obj, checked: false }));
    setClusters(modifiedData);
    setIsSearching(true)
    if (name === '') {
      getAllImagesFull(page).then((res) => {
        setImages(res.data.files)
        setIsSearching(false)
      }).catch((err) => {
        console.log(err)
        setIsSearching(false)
      }
      )
      return
    }
    searchByFileNameService(page, name).then((res) => {
      if (res.data.files.length === 0) {
        setImages([])
        setIsSearching(false)
        return
      }
      setImages(res.data.files)
    }
    ).catch((err) => {
      console.log(err)
    }
    ).finally(() => {
      setIsSearching(false)
    }
    )
  }


  const handleOptionChange = (id) => {
    var temp = clusters
    temp.find((cluster) => cluster._id === id).checked = !temp.find((cluster) => cluster._id === id).checked
    setClusters(temp.slice())
    optionSend()
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setFile(acceptedFiles[0])
    search(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    paramName: "file",
    maxFilesize: 40, // MB
    maxFiles: 1,
    addRemoveLinks: true,
    uploadMultiple: false,
    acceptedFiles: "image/*",
  })

  const optionSend = () => {
    var temp = clusters
    let tempArr = []
    temp.map((cluster) => {if(cluster.checked){ tempArr.push(cluster.cluster_id)}})
    //Make tempArr {cluster[] : cluster._id}
    tempArr = tempArr.map((cluster) => { return cluster })
    if(tempArr.length === 0){
      getPage()
    }else{
          setIsSearching(true)
    filterByLabel(page ,{ clusters : tempArr}).then((res) => {
      console.log(res.data.files)
      setImages(res.data.files)
    }
    ).catch((err) => {
      console.log(err)
    }
    ).finally(() => {
      setIsSearching(false)
    }
    )
    }

  }

  return (
    <div className='flex h-full font-bold text-white'>
      <SearchPagination page={page} totalPage={totalPage} setPage={setPage} />
      <div className='min-w-[224px] w-[224px] h-screen overflow-y-auto justify-between flex flex-col bg-slate-800'>
        <div className='w-full h-fit flex flex-col'>
          <div onClick={() => { getPage() }} style={{ display: "flex" }} className='w-full cursor-pointer h-fit p-5 hover:bg-slate-600 flex flex-row items-center justify-center px-5 '>
            <img alt='ait-logo' className='w-[50px]' src='assets/images/rounded-logo.png'></img>
          </div>
          <div style={{ display: "flex" }} className='w-full h-fit border-t  p-2 border-gray-900 justify-between flex flex-col items-center'>
            <div onClick={() => { setIsClusterOpen(!isClusterOpen) }} className='w-full cursor-pointer hover:bg-slate-600 p-2 mb-1 rounded-lg flex justify-between items-center'><AiOutlineCluster /><p> Clusters </p>{!isClusterOpen ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}</div>
            {isClusterOpen && <div className='w-full  gap-5 flex flex-col items-center justify-center'>
              <div className='w-full overflow-x-hidden text-white bg-slate-700 rounded-lg h-52 overflow-y-auto flex flex-col'>
                {!clusterLoading ? clusters?.map((cluster, i) => (
                  <div key={i} className='w-full px-2 justify-between flex items-center'>
                    <FormControlLabel
                      className='w-3/4 justify-between items-center '
                      label={<p title={cluster?.cluster_name} className='w-20 text-sm text-ellipsis inline-block whitespace-nowrap overflow-hidden'>{cluster?.cluster_name}</p>}
                      control={
                        <Checkbox checked={cluster.checked} onClick={(e) => { handleOptionChange(cluster._id) }} />
                      }

                    />
                    <BsTrash onClick={() => { deleteCluster(cluster?.cluster_id) }} className='hover:text-red-500' />
                  </div>
                )) : <div className='w-full h-full flex justify-center items-center'>
                  <AiOutlineLoading className='animate-spin' />
                </div>
                }
              </div>
              <div className='w-full flex'>
                <input value={clusterName} onChange={(e) => { setClusterName(e.target.value) }} className='h-10 rounded-l-lg focus:bg-gray-600 bg-slate-800 border border-black focus:border-cyan-600 outline-none mb-5 p-2 w-full' type='text' placeholder='Label Name'></input>
                <button onClick={() => { addClusterr(clusterName) }} className='p-2 rounded-r-lg w-16 mb-5 text-white font-bold hover:bg-cyan-600 flex items-center justify-center'>Add</button>
              </div>

            </div>
            }
          </div>
          <div style={{ display: "flex" }} className='w-full h-fit border-t  p-2 border-gray-900 justify-between gap-4 flex flex-col items-center py-5'>
            <div className='w-full p-2 flex justify-between items-center'><MdImageSearch /><p> Ai Search </p><p className='w-2'></p></div>
            <div className='w-full h-fit rounded-lg' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className='w-full h-56  rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
        <div
          className="w-full h-full flex flex-col  justify-center items-center  rounded-lg"
        >
   
          <AiOutlineCloudDownload  className='text-5xl animate-bounce' />
          <p  className='text-xl'>Drop File Here</p>
        </div>
      </div> :
           <div  className='rounded-lg h-fit cursor-pointer border-2 border-[#4a5568] p-5 hover:bg-gray-500 border-dashed w-full min-h-[200px] flex items-center justify-center'>
           {file ? <div className='h-full w-full flex flex-col items-center gap-5 justify-center'><img alt='file-images' className='max-h-64 min-h-54' src={URL.createObjectURL(file)}></img>{isSearching && <div className='w-full  justify-between items-center flex-col'><LinearProgress className='w-full h-10' /></div>}</div>
             :
             <div className='flex flex-col items-center justify-center'>
               <div className='w-16 h-16 bg-green-500 text-2xl rounded-full flex justify-center items-center'>+</div>
             </div>}
         </div>
      }
    </div>
    {file && <p onClick={()=>{setFile(null); getPage()}} className='hover:border-b text-white text-sm cursor-pointer'>Remove file</p>}
            {/* {dragging ? <div className='w-full h-56  rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
              <div
                className="w-full h-full flex flex-col  justify-center items-center  rounded-lg"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  onChange={async (event) => { setFile(event.target.files[0]); }}
                  hidden
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                />
                <AiOutlineCloudDownload onDrop={handleDrop} onDragOver={handleDragOver} className='text-5xl animate-bounce' />
                <p onDrop={handleDrop} onDragOver={handleDragOver} className='text-xl'>Drop File Here</p>
              </div>
            </div> : <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => { fileInputRef.current.click() }} className='rounded-lg h-fit cursor-pointer border-2 border-[#4a5568] p-5 hover:bg-gray-500 border-dashed w-full min-h-[200px] flex items-center justify-center'>
              <input
                type="file"
                onChange={async (event) => { handleFileChange(event) }}
                hidden
                accept="image/png, image/jpeg"
                ref={fileInputRef}
              />
              {file ? <div className='h-full w-full flex flex-col items-center gap-5 justify-center'><img alt='file-images' className='max-h-64 min-h-54' src={URL.createObjectURL(file)}></img>{isSearching && <LinearProgress className='w-full h-10' />}</div>
                :
                <div className='flex flex-col items-center justify-center'>
                  <div className='w-16 h-16 bg-green-500 text-2xl rounded-full flex justify-center items-center'>+</div>
                </div>}
            </div>} */}

          </div>
          <div style={{ display: "flex" }} className='w-full p-2 cursor-pointer h-fit border-t border-b border-gray-900 justify-between flex items-center py-2'>
            <div onClick={() => { getHiddenImages(page) }} className='w-full p-2 flex justify-between items-center hover:bg-slate-600 rounded-lg'><BsTrash /><p> Recycle </p><p className='w-8'></p></div>
          </div>
        </div>
          <a style={{ display: "flex" }} target='_blank' rel='noreferrer' href='https://www.ai.ait.com.tr' className='w-full h-fit mb-10  text-gray-500 justify-between hover:bg-slate-600 flex items-center p-5'>
          <p className='w-1' /><p> Archivist 0.0.1 </p><p className='w-1'></p>
        </a>
      </div>
      <div className='w-full h-full bg-[#e5e7eb]'>
        {/* children[0] is the Header component */}
        <div className='bg-[#ffffff] w-full h-[6vh] items-end justify-end p-5 flex'>
          {cloneElement(children[0], { mapingType, setMapingType, searchByFileName, isSearching })}
        </div>
        {/* children[1] is the Body component */}
        <div className='h-[94vh] w-full flex items-center justify-center'>
          {cloneElement(children[1], {  mapingType, isSearching, images, setImages })}
        </div>

      </div>

    </div>
  )
}

export default LeftBar