import { Request, Response } from 'express';
import * as prepFormService from './inventoryPrepForm.service';

export const getPrepFormsByItem = async (req: Request, res: Response) => {
  const forms = await prepFormService.getPrepFormsByItem(req.params.itemId);
  res.json(forms);
};

export const getPrepFormById = async (req: Request, res: Response) => {
  const form = await prepFormService.getPrepFormById(req.params.id);
  res.json(form);
};

export const createPrepForm = async (req: Request, res: Response) => {
  const form = await prepFormService.createPrepForm(req.body);
  res.status(201).json(form);
};

export const updatePrepForm = async (req: Request, res: Response) => {
  const form = await prepFormService.updatePrepForm(req.params.id, req.body);
  res.json(form);
};

export const deletePrepForm = async (req: Request, res: Response) => {
  await prepFormService.deletePrepForm(req.params.id);
  res.status(204).send();
};
