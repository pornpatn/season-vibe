import { Request, Response } from 'express';
import * as locationItemService from './inventoryLocationItem.service';

export const getLocationItemsByLocation = async (req: Request, res: Response) => {
  const items = await locationItemService.getLocationItemsByLocation(req.params.locationId);
  res.json(items);
};

export const addLocationItem = async (req: Request, res: Response) => {
  const item = await locationItemService.addLocationItem(req.body);
  res.status(201).json(item);
};

export const removeLocationItem = async (req: Request, res: Response) => {
  await locationItemService.removeLocationItem(req.params.id);
  res.status(204).send();
};
