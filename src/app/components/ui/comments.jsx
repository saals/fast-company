import React from 'react'
import { orderBy } from 'lodash'

import CommentsList, { NewCommentForm } from '../common/comments'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
  const { createComment, comments } = useComments()

  const handleCommentAdd = (data) => {
    createComment(data)
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((comment) => setComments([...comments, comment]))
  }

  const handleCommentRemove = (id) => {
    // api.comments
    //   .remove(id)
    //   .then((id) => setComments(comments.filter((c) => c._id !== id)))
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
