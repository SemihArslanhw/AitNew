import React from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import {AiOutlineCluster} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import {AiOutlineArrowDown} from 'react-icons/ai'
import {MdImageSearch} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'

function LeftBar({ children , isDragging , setIsDragging}) {

  const [file, setFile] = React.useState(null)
  const inputRef = React.useRef();

  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
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
    <div className='flex h-full w-full text-white text-lg cursor-pointer'>
      <Menu styles={styles}>
        <Link style={{display:"flex"}} to={"/"} className='w-full h-fit  hover:bg-slate-600 flex flex-row items-center justify-center p-5 '>
          <img alt='ait-logo' className='w-[50px]' src='assets/images/rounded-logo.png'></img>
        </Link>
        <Link style={{display:"flex"}} to={"/"} className='w-full h-fit border-t-2 justify-around hover:bg-slate-600 flex flex-col items-center p-5 '>
         <div className='w-full flex justify-between items-center'><AiOutlineCluster/><p> Clusters </p><p className='w-6'></p></div> 
        </Link>
        <div style={{display:"flex"}} className='w-full h-fit border-t-2 justify-between gap-4 flex flex-col items-center p-5'>
          <div className='w-full flex justify-between items-center'><MdImageSearch/><p> Ai Search </p><p className='w-2'></p></div>
          <div className='rounded-lg border-2 border-[#4a5568] hover:bg-gray-500 border-dashed w-full h-36 flex items-center justify-center'>
          <input 
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
            <p>+</p>
          </div>
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
          {children[1]}
        </div>

      </div>

    </div>
  )
}

export default LeftBar