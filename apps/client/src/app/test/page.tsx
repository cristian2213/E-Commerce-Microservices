import { auth } from '@clerk/nextjs/server'

const TestPage = async () => {
  const { getToken } = await auth()
  const token = await getToken()

  console.log(token)

  const prodRes = await fetch('http://localhost:8000/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const prodData = await prodRes.json()

  const orderRes = await fetch('http://localhost:8001/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const orderData = await orderRes.json()

  const payRes = await fetch('http://localhost:8002/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const payData = await payRes.json()

  console.log(prodData)
  console.log(orderData)
  console.log(payData)
  return <div>Test Page</div>
}

export default TestPage
