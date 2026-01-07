import { auth } from '@clerk/nextjs/server'

const TestPage = async () => {
  const { getToken } = await auth()
  const token = await getToken()

  const res = await fetch('http://localhost:8000/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()
  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  )
}

export default TestPage
