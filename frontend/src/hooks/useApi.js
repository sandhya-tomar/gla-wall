import { useState, useEffect } from 'react'
import axios from 'axios'

export function useApi(url, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    setLoading(true)
    axios.get(url)
      .then(res => { setData(res.data); setLoading(false) })
      .catch(err => { setError(err.response?.data?.message || 'Something went wrong'); setLoading(false) })
  }, deps)

  return { data, loading, error }
}
