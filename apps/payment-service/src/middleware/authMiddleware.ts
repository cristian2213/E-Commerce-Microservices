import { getAuth } from '@hono/clerk-auth'
import { createMiddleware } from 'hono/factory'
import { CustomJwtSessionClaims } from '@repo/types'

export const shouldBeUser = createMiddleware(async (c, next) => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({ message: 'You are not logged in' }, 401)
  }

  c.set('userId', auth.userId)

  await next()
})

export const shouldBeAdmin = createMiddleware(async (c, next) => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({ message: 'You are not logged in' }, 401)
  }

  const claims = auth.sessionClaims?.metadata as CustomJwtSessionClaims

  if (claims?.role !== 'admin') {
    return c.json({ message: 'Unauthorized' }, 403)
  }

  c.set('userId', auth.userId)

  await next()
})
