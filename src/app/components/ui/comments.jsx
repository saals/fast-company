import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'

import api from '../../api'
import CommentsList, { NewCommentForm } from '../common/comments'

const Comments = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    api.comments
      .fetchCommentsForUser(userId)
      .then((comments) => setComments(comments))
  }, [])

  const handleCommentAdd = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((comment) => setComments([...comments, comment]))
  }

  const handleCommentRemove = (id) => {
    api.comments
      .remove(id)
      .then((id) => setComments(comments.filter((c) => c._id !== id)))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <NewCommentForm onSubmit={handleCommentAdd} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleCommentRemove}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
