import { prisma, Prisma } from '@repo/product-db'
import { Request, Response } from 'express'

export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body

  const category = await prisma.category.create({ data })
  return res.status(201).json(category)
}

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  const data: Prisma.CategoryUpdateInput = req.body
  const categoryExists = await prisma.category.findUnique({
    where: { id: Number(id) },
  })
  if (!categoryExists) {
    return res.status(404).json({ message: 'Category not found' })
  }

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data,
  })

  return res.status(200).json(category)
}

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  const categoryExists = await prisma.category.findUnique({
    where: { id: Number(id) },
  })
  if (!categoryExists) {
    return res.status(404).json({ message: 'Category not found' })
  }
  const category = await prisma.category.delete({ where: { id: Number(id) } })
  return res.status(200).json(category)
}

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany()
  return res.status(200).json(categories)
}
