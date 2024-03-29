import React from 'react'
import { PropTypes } from 'prop-types'

import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import { useUser } from '../../../hooks/useUser'
import CommentsProvider from '../../../hooks/useComments'

const UserPage = ({ userId }) => {
  const { getUserById } = useUser()
  const user = getUserById(userId)

  if (!user) return 'Loading'

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.qualities} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
    </div>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
