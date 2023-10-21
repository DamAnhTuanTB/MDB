import { useEffect, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'
import ReactPaginate from 'react-paginate'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'

type Props = {
  totalCount: number
  itemsPerPage?: number
  className?: string
}

function Pagination({ itemsPerPage = 10, totalCount, className }: Props) {
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const [page, setPage] = useState<number>(Number(query.page) || 1)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  const pageCount = Math.ceil(totalCount / itemsPerPage)
  console.log(page)

  useEffect(() => {
    setPage(Number(query.page) || 1)
  }, [query])

  useEffect(() => {
    updateQueryParams({ ...query, page })
  }, [page])

  const handlePageClick = (event: any) => {
    // const newOffset = (event.selected * itemsPerPage) % totalCount
    setPage(event.selected + 1)
  }

  return (
    totalCount > itemsPerPage && (
      <div className={classNames('pagination-wrapper', className)}>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel={
            <div className="button">
              Next <Image src={'/images/icons/arrow_dark_blue.svg'} width={24} height={24} alt="next" />
            </div>
          }
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          initialPage={page - 1}
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
  )
}

export default Pagination
