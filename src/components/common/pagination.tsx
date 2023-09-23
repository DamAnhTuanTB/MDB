import { useState } from 'react'

import Image from 'next/image'

import ReactPaginate from 'react-paginate'

type Props = {
  itemsPerPage: number
  totalCount: number
}

export default function Pagination({ itemsPerPage, totalCount }: Props) {
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const pageCount = Math.ceil(totalCount / itemsPerPage)
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % totalCount
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel={
          <div className="button">
            Next <Image src={'/images/icons/arrow_dark_blue.svg'} width={24} height={24} alt="next" />
          </div>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <div className="button">
            <Image src={'/images/icons/arrow_dark_blue.svg'} width={24} height={24} alt="next" /> Previous
          </div>
        }
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
