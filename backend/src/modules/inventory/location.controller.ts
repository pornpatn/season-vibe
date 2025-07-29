import { Request, Response } from 'express';
import * as locationService from './location.service';

export async function getLocations(req: Request, res: Response) {
  const locations = await locationService.getAllLocations();
  res.json(locations);
}

export async function getLocation(req: Request, res: Response) {
  const location = await locationService.getLocationById(req.params.id);
  if (!location) return res.status(404).json({ message: 'Location not found' });
  res.json(location);
}

export async function createLocation(req: Request, res: Response) {
  const { name } = req.body;
  const location = await locationService.createLocation({ name });
  res.status(201).json(location);
}

export async function updateLocation(req: Request, res: Response) {
  const { name } = req.body;
  const location = await locationService.updateLocation(req.params.id, { name });
  res.json(location);
}

export async function deleteLocation(req: Request, res: Response) {
  await locationService.deleteLocation(req.params.id);
  res.status(204).end();
}
