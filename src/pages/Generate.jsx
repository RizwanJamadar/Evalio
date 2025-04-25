import React from 'react'
import Agent from '../components/Agent'

const Generate = () => {
    const user = {
        id:1,
        name:"Rizwan",
        profileURL:"sadfa"
    }
  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
    </>
  )
}

export default Generate