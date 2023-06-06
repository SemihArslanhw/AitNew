import { Pagination } from '@mui/material'
import React from 'react'

function SearchPagination({page , totalPage , setPage}) {

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div draggable={true} className='fixed flex items-center justify-center right-10 px-5 z-20 bottom-5 w-fit h-14 rounded-lg shadow-lg bg-white'>
        <Pagination count={totalPage} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
    </div>
  )
}

export default SearchPagination