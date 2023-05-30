import React, { cloneElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import { AiOutlineCloudDownload, AiOutlineCluster, AiOutlineLoading } from 'react-icons/ai'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { MdImageSearch } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { Checkbox, FormControlLabel } from '@mui/material'
import ProgressBar from './ProgressBar/ProgressBar'
import { getClusters } from '../../Api/Cluster/clusterRequests'
import * as API from '../../Api/index'
import { getAllImagesFull, getHiddenFilesService, searchByFileNameService, uploadFileService } from '../../Api/File/FileControler'


function LeftBar({ children }) {

  const [images, setImages] = React.useState([])
  const [mapType, setMapType] = React.useState('')
  const [clusterLoading, setClusterLoading] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false)
  const [isSearching, setIsSearching] = React.useState(false)
  const fileInputRef = React.useRef();
  const inputRef = React.useRef();
  const [searchProgress, setSearchProgress] = React.useState(0)
  const [file, setFile] = React.useState(null)
  const [clusters, setClusters] = React.useState([])
  const [isClusterOpen, setIsClusterOpen] = React.useState(false)
  const [clusterName, setClusterName] = React.useState('')



  useEffect(() => {
    getAllClusters()
    getFirstPage()
  }, [])

  const getFirstPage = async () => {
    setIsSearching(true)
    getAllImagesFull("1").then((res) => {
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
    await API.addCluster(name).then((res) => {
      res.data.checked = false
      setClusters([...clusters, res.data ])
    }).catch((err) => {
      console.log(err)
    })
    setClusterLoading(false)
    // await addCluster(name).then((res) => {
    //   setClusters([...clusters, res.data])
    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  const searchByFileName = async (page, name) => {
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

  const handleDragEnd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  const handleDragStart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.setData('text', 'image')
    setDragging(true)
    setIsHamburgerOpen(true)
  }


  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    setIsHamburgerOpen(true)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setDragging(false)
    await urlToObject(e.dataTransfer.getData('text'))
    await search(file)
  }

  const urlToObject = async (url) => {
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const file = await new File([blob], 'image.jpg', { type: blob.type });
    setFile(file)
  }

  const handleStateChange = (e) => {
    setIsHamburgerOpen(e.isOpen)
  }
  
  const handleOptionChange = (id) => {
    var temp = clusters
    temp.find((cluster) => cluster._id === id).checked = !temp.find((cluster) => cluster._id === id).checked
    setClusters(temp.slice())

  }

  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '3rem',
      height: '3.1vh',
      left: '36px',
      top: '13px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <div onDragEnd={handleDragEnd} className='flex h-full w-full text-white text-lg'>
      <Menu onStateChange={handleStateChange} isOpen={isHamburgerOpen} styles={styles}>
        <div className='w-full h-[90%] flex flex-col'>
          <div onClick={()=>{getFirstPage()}} style={{ display: "flex" }} className='w-full cursor-pointer h-fit  hover:bg-slate-600 flex flex-row items-center justify-center p-5 '>
            <img alt='ait-logo' className='w-[50px]' src='assets/images/rounded-logo.png'></img>
          </div>
          <Link style={{ display: "flex" }} className='w-full gap-5 h-fit border-t-2 justify-around hover:bg-slate-600 flex flex-col items-center'>
            <div onClick={() => { setIsClusterOpen(!isClusterOpen) }} className='w-full p-5 flex justify-between items-center'><AiOutlineCluster /><p> Clusters </p>{!isClusterOpen ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}</div>
            {isClusterOpen && <div className='w-full px-5 gap-5 flex flex-col items-center justify-center'>
              <div className='w-full overflow-x-hidden text-white bg-slate-500  rounded-lg h-52 overflow-y-auto flex flex-col'>
                {!clusterLoading ? clusters?.map((cluster, i) => (
                  <div key={i} className='w-full px-2 justify-between flex items-center'>
                    <FormControlLabel
                      className='w-3/4 justify-between items-center '
                      label={<p title={cluster?.cluster_name} className='w-20 text-ellipsis inline-block whitespace-nowrap overflow-hidden'>{cluster?.cluster_name}</p>}
                      control={
                        <Checkbox checked={cluster.checked} onClick={(e)=>{handleOptionChange(cluster._id)}} />
                      }
                      
                    />
                    <BsTrash onClick={() => { deleteCluster(cluster?.cluster_id) }} className='hover:text-red-500' />
                  </div>
                )) : <div className='w-full h-full flex justify-center items-center'>
                  <AiOutlineLoading className='animate-spin' />
                </div>
                }
              </div>
              <div className='w-full gap-5 flex'>
                <input value={clusterName} onChange={(e) => { setClusterName(e.target.value) }} className='h-full rounded-lg border-2 mb-5 outline-none p-2 w-full' type='text' placeholder='Cluster Name'></input>
                <button onClick={() => { addClusterr(clusterName) }} className='bg-green-500 p-2 rounded-lg w-10 mb-5 text-white font-bold hover:bg-green-400 flex items-center justify-center'>+</button>
              </div>

            </div>
            }
          </Link>
          <div style={{ display: "flex" }} className='w-full h-fit border-t-2 justify-between gap-4 flex flex-col items-center p-5'>
            <div className='w-full flex justify-between items-center'><MdImageSearch /><p> Ai Search </p><p className='w-2'></p></div>
            {dragging ? <div className='w-full h-36  rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
              <div
                className="w-full h-full flex flex-col  justify-center items-center p-5 rounded-lg"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  hidden
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                />
                <AiOutlineCloudDownload onDrop={handleDrop} onDragOver={handleDragOver} className='text-9xl animate-bounce' />
                <p className='text-2xl'>Drop File Here</p>
              </div>
            </div> : <div onClick={() => { fileInputRef.current.click() }} className='rounded-lg h-fit cursor-pointer border-2 border-[#4a5568] p-5 hover:bg-gray-500 border-dashed w-full min-h-[200px] flex items-center justify-center'>
              <input
                type="file"
                onChange={async (event) => { setFile(event.target.files[0]); await search() }}
                hidden
                accept="image/png, image/jpeg"
                ref={fileInputRef}
              />
              {file ? <div className='h-full w-full flex flex-col items-center gap-5 justify-center'><img alt='file-images' className='max-h-64' src={URL.createObjectURL(file)}></img>{isSearching && <div className='w-full h-5'><ProgressBar value={searchProgress} /></div>}</div>
                :
                <div className='flex flex-col items-center justify-center'>
                  <p>+</p>
                </div>}
            </div>}
          </div>
          <div onClick={()=>{getHiddenImages(1)}} style={{ display: "flex" }} className='w-full cursor-pointer h-fit border-t-2 justify-around hover:bg-slate-600 flex items-center p-5'>
            <BsTrash /><p> Recycle </p><p className='w-8'></p>
          </div>
        </div>
        <a style={{ display: "flex" }} target='_blank' rel='noreferrer' href='https://www.ai.ait.com.tr' className='w-full h-fit text-gray-500 justify-around hover:bg-slate-600 flex items-center p-5'>
          <p className='w-8' /><p> Archivist 0.0.1 </p><p className='w-8'></p>
        </a>
      </Menu>

      <div className='w-full h-full bg-[#e5e7eb]'>
        {/* children[0] is the Header component */}
        <div className='bg-[#ffffff] w-full h-[6vh] items-end justify-end p-5 flex'>
          {cloneElement(children[0], { mapType, setMapType, searchByFileName, isSearching })}
        </div>
        {/* children[1] is the Body component */}
        <div className='h-[94vh] w-full flex items-center justify-center'>
          {cloneElement(children[1], { handleDragOver, handleDragStart, isSearching , images, setImages })}
        </div>

      </div>

    </div>
  )
}

export default LeftBar