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
  const itemId = req.params.itemId;
  const form = await prepFormService.createPrepForm(itemId, req.body);
  res.status(201).json(form);
};

export const updatePrepForm = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await prepFormService.updatePrepForm(id, req.body);
  res.json(result);
};

export const deletePrepForm = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prepFormService.deletePrepForm(id);
  res.status(204).send();
};
