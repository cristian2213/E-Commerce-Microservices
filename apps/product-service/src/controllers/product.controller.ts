import { Request, Response } from 'express'
import { prisma, Prisma } from '@repo/product-db'

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body

  const { colors, images } = data

  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res
      .status(400)
      .json({ message: 'Colors is required and must be an array' })
  }

  if (
    !images ||
    typeof images !== 'object' ||
    Object.values(images).length === 0
  ) {
    return res
      .status(400)
      .json({ message: 'Images is required and must be an object' })
  }

  const missingColors = colors.filter((color) => !(color in images))

  if (missingColors.length > 0) {
    return res.status(400).json({
      message: 'Missing images for colors',
      missingColors,
    })
  }

  const product = await prisma.product.create({ data })
  return res.status(201).json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const data: Prisma.ProductUpdateInput = req.body

  const productExists = await prisma.product.findUnique({
    where: { id: Number(id) },
  })

  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' })
  }

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  })

  return res.status(200).json(product)
}
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const productExists = await prisma.product.findUnique({
    where: { id: Number(id) },
  })

  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' })
  }

  const product = await prisma.product.delete({ where: { id: Number(id) } })

  return res.status(200).json(product)
}

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query

  const orderBy = (() => {
    switch (sort) {
      case 'asc':
        return { price: Prisma.SortOrder.asc }
      case 'desc':
        return { price: Prisma.SortOrder.desc }
      case 'oldest':
        return { createdAt: Prisma.SortOrder.asc }
      default:
        return { createdAt: Prisma.SortOrder.desc }
    }
  })()

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: 'insensitive',
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  })
  return res.status(200).json(products)
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await prisma.product.findUnique({ where: { id: Number(id) } })

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  return res.status(200).json(product)
}
