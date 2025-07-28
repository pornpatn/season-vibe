import { Request, Response } from 'express';
import * as service from './inventoryParLevel.service';

export async function getParLevels(req: Request, res: Response) {
  const { itemId, locationId } = req.query;
  const result = await service.getParLevels({
    itemId: itemId as string,
    locationId: locationId as string
  });
  res.json(result);
}

export async function setParLevels(req: Request, res: Response) {
  const { itemLocationId, parLevels } = req.body;
  const result = await service.setParLevels(itemLocationId, parLevels);
  res.status(201).json(result);
}

export async function updateParLevel(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  const result = await service.updateParLevel(id, amount);
  res.json(result);
}

export async function deleteParLevel(req: Request, res: Response) {
  const { id } = req.params;
  await service.deleteParLevel(id);
  res.status(204).send();
}