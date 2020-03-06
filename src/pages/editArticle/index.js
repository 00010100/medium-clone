import React, {useEffect, useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'

import {ArticleForm} from 'components/articleForm'
import useFetch from 'hooks/useFetch'
import {CurrentUserContext} from 'contexts/currentUser'

export const EditArticle = ({match}) => {
  const {slug} = match.params

  const [currentUserState] = useContext(CurrentUserContext)
  const apiUrl = `/articles/${slug}`
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
  const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)

  const [initialValues, setInitialValues] = useState(null)
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!fetchArticleResponse) return

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse])

  useEffect(() => {
    if (!updateArticleResponse) return
    setIsSuccessfullSubmit(true)
  }, [updateArticleResponse])

  const handleSubmit = article => {
    doUpdateArticle({
      method: 'PUT',
      data: {article}
    })
  }

  if (currentUserState.isLoggedIn === false) return <Redirect to="/" />
  if (isSuccessfullSubmit) return <Redirect to={`articles/${slug}`} />

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  )
}
