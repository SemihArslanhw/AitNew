import React, { cloneElement } from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import {AiOutlineCloudDownload, AiOutlineCluster} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import {AiOutlineArrowDown} from 'react-icons/ai'
import {MdImageSearch} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'
import { Checkbox, FormControlLabel } from '@mui/material'


function LeftBar({ children }) {

  const [dragging, setDragging] = React.useState(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false)
  const fileInputRef = React.useRef();
  const inputRef = React.useRef();
  const [file, setFile] = React.useState(null)
  const [clusters , setClusters] = React.useState([
    {name:"Cluster 1"},
    {name:"Cluster 2"},
    {name:"Cluster 3"},
    {name:"Cluster 4"},
    {name:"Cluster 5"},
    {name:"Cluster 6"},
    {name:"Cluster 7"},
    {name:"Cluster 8"},
    {name:"Cluster 9"},
    {name:"Cluster 10"},
    {name:"Cluster 11"},
    {name:"Cluster 12"},
  ])
  const [isClusterOpen , setIsClusterOpen] = React.useState(false)
  
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
    setIsHamburgerOpen(true)
    console.log('drag over')
}

const handleDrop = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log(e.dataTransfer.files[0])
    setFile(e.dataTransfer.files[0])
    setDragging(false)
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
    <div onDragLeave={handleDragOver} className='flex h-full w-full text-white text-lg'>
      <Menu isOpen={isHamburgerOpen} styles={styles}>
        <Link style={{display:"flex"}} to={"/"} className='w-full h-fit  hover:bg-slate-600 flex flex-row items-center justify-center p-5 '>
          <img alt='ait-logo' className='w-[50px]' src='assets/images/rounded-logo.png'></img>
        </Link>
        <Link style={{display:"flex"}} to={"/"}  className='w-full gap-5 h-fit border-t-2 justify-around hover:bg-slate-600 flex flex-col items-center'>
         <div onClick={()=>{setIsClusterOpen(!isClusterOpen)}} className='w-full p-5 flex justify-between items-center'><AiOutlineCluster/><p> Clusters </p>{!isClusterOpen ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>}</div> 
          {isClusterOpen && <div className='w-full px-5 gap-5 flex flex-col items-center justify-center'>
            <div className='w-full overflow-x-hidden text-white bg-slate-500  rounded-lg h-52 overflow-y-auto flex flex-col items-center justify-center'>
              {clusters.map((cluster)=>(
                <FormControlLabel
                className='w-full justify-evenly '
                label={cluster.name}
                control={<Checkbox checked={true} />}
              />
              
              ))}
            </div>
            <div className='w-full flex'>
            <input className='h-full rounded-lg border-2 mb-5 outline-none p-2 w-full' type='text' placeholder='Cluster Name'></input>
            </div>
            
            </div>
          }
        </Link>
        <div style={{display:"flex"}}  className='w-full h-fit border-t-2 justify-between gap-4 flex flex-col items-center p-5'>
          <div className='w-full flex justify-between items-center'><MdImageSearch/><p> Ai Search </p><p className='w-2'></p></div>
          {dragging ? <div onDragLeave={handleDragEnd} className='w-full h-full bg-[#cbd5e1] rounded-lg border-2 border-[#4a5568] border-dashed flex justify-center items-center'>
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
        </div>  : <div onClick={()=>{fileInputRef.current.click()}} className='rounded-lg border-2 border-[#4a5568] hover:bg-gray-500 border-dashed w-full h-36 flex items-center justify-center'>
          <input 
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
            hidden
            accept="image/png, image/jpeg"
            ref={fileInputRef}
          />
            {!dragging ? <p>+</p> : <AiOutlineCloudDownload/>}
          </div>}
        </div>
        <Link style={{display:"flex"}} to={"/exjson"} className='w-full h-fit border-t-2 justify-around hover:bg-slate-600 flex items-center p-5'>
          <BsTrash/><p> Recycle </p><p className='w-8'></p>
        </Link>
      </Menu>

      <div className='w-full h-full bg-[#e5e7eb]'>
        {/* children[0] is the Header component */}
        <div className='bg-[#ffffff] w-full h-[6vh] items-end justify-end p-5 flex'>
          {children[0]}
        </div>
        {/* children[1] is the Body component */}
        <div className='h-[94vh] w-full flex items-center justify-center'>
          {cloneElement(children[1], { dragging, setDragging , handleDragOver})}
        </div>

      </div>

    </div>
  )
}

export default LeftBar