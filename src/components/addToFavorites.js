import React from 'react'
import cl from 'classnames'

import useFetch from 'hooks/useFetch'

export const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const apiUrl = `/articles/${articleSlug}/favorite`
  const [{response}, doFetch] = useFetch(apiUrl)

  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited

  const handleLike = event => {
    event.preventDefault()

    doFetch({
      method: isFavoritedWithResponse ? 'DELETE' : 'POST'
    })
  }

  return (
    <button
      className={cl('btn btn-sm', {
        'btn-primary': isFavoritedWithResponse,
        'btn-outline-primary': !isFavoritedWithResponse
      })}
      onClick={handleLike}
    >
      <i className="ion-heart">
        <span>&nbsp; {favoritesCountWithResponse}</span>
      </i>
    </button>
  )
}
