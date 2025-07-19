import { Request, Response } from 'express';
import * as parLevelService from './parLevel.service';

export const getParLevelsByItem = async (req: Request, res: Response) => {
  const levels = await parLevelService.getParLevelsByItem(req.params.itemId);
  res.json(levels);
};

export const setParLevel = async (req: Request, res: Response) => {
  const level = await parLevelService.setParLevel(req.body);
  res.status(201).json(level);
};

export const deleteParLevel = async (req: Request, res: Response) => {
  const { itemId, dayOfWeek } = req.params;
  await parLevelService.deleteParLevel(itemId, parseInt(dayOfWeek));
  res.status(204).send();
};
