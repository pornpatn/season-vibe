import { Request, Response } from 'express';
import * as unitService from './unit.service';

export const getAllUnits = async (_req: Request, res: Response) => {
  const units = await unitService.getAllUnits();
  res.json(units);
};

export const getUnitById = async (req: Request, res: Response) => {
  const unit = await unitService.getUnitById(req.params.id);
  res.json(unit);
};

export const createUnit = async (req: Request, res: Response) => {
  const unit = await unitService.createUnit(req.body);
  res.status(201).json(unit);
};

export const updateUnit = async (req: Request, res: Response) => {
  const unit = await unitService.updateUnit(req.params.id, req.body);
  res.json(unit);
};

export const deleteUnit = async (req: Request, res: Response) => {
  await unitService.deleteUnit(req.params.id);
  res.status(204).send();
};
