import { useEffect, useState } from 'react'
import httpService from '../services/httpService'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'

const useMockData = () => {
  const statusCondition = {
    idle: 'Not Started',
    pending: 'In Process',
    successes: 'Ready',
    error: 'Error occurred'
  }
  const [status, setStatus] = useState(statusCondition.idle)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)

  const countAll = professions.length + qualities.length + users.length

  useEffect(() => {
    updateProgress()
  }, [count])

  const updateProgress = () => {
    if (count !== 0 && status === statusCondition.idle) {
      setStatus(statusCondition.pending)
    }
    const newProgress = Math.floor((count / countAll) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusCondition.successes)
    }
  }

  const initialize = async () => {
    try {
      for (const user of users) {
        await httpService.put('user/' + user._id, user)
        incrementCount()
      }
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof)
        incrementCount()
      }
      for (const qual of qualities) {
        await httpService.put('quality/' + qual._id, qual)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusCondition.error)
    }
  }
  const incrementCount = () => {
    setCount((prev) => prev + 1)
  }

  return { initialize, error, status, progress }
}

export default useMockData
