import { Request, Response } from 'express';
import * as categoryService from './category.service';

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(204).send();
};
