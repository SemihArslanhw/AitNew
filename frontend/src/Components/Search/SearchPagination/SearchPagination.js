import { Pagination } from '@mui/material'
import React from 'react'

function SearchPagination() {
  return (
    <div draggable={true} className='fixed flex items-center justify-center right-10 z-20 bottom-5 w-96 h-14 rounded-lg shadow-lg bg-white'>
        <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  )
}

export default SearchPagination