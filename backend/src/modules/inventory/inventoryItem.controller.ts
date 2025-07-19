import { Request, Response } from 'express';
import * as inventoryItemService from './inventoryItem.service';

export const getAllInventoryItems = async (_req: Request, res: Response) => {
  const items = await inventoryItemService.getAllInventoryItems();
  res.json(items);
};

export const getInventoryItemById = async (req: Request, res: Response) => {
  const item = await inventoryItemService.getInventoryItemById(req.params.id);
  res.json(item);
};

export const createInventoryItem = async (req: Request, res: Response) => {
  const item = await inventoryItemService.createInventoryItem(req.body);
  res.status(201).json(item);
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  const item = await inventoryItemService.updateInventoryItem(req.params.id, req.body);
  res.json(item);
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  await inventoryItemService.deleteInventoryItem(req.params.id);
  res.status(204).send();
};
