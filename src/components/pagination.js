import React from 'react'
import {Link} from 'react-router-dom'
import cl from 'classnames'
import {range} from 'utils'

const PaginationItem = ({page, currentPage, url}) => (
  <li className={cl('page-item', {active: currentPage === page})}>
    <Link className="page-link" to={`${url}?page=${page}`}>
      {page}
    </Link>
  </li>
)

export const Pagination = ({total, limit, url, currentPage}) => {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)

  return (
    <ul className="pagination">
      {pages.map(page => (
        <PaginationItem page={page} currentPage={currentPage} url={url} key={page} />
      ))}
    </ul>
  )
}
