import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import commentService from '../services/commentService'

const CommentsContext = React.createContext()

export const useComments = () => useContext(CommentsContext)

const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [comments, setComments] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
  }, [userId])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      create_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prev) => [...prev, content])
    } catch (error) {
      errorCatcher(error)
    }
    console.log(comment)
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      console.log(content)
      setComments(content)
    } catch (error) {
      console.log(error)
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CommentsProvider
