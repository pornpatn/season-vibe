import { Request, Response } from 'express';
import * as inventoryLocationService from './inventoryLocation.service';

export async function createInventoryLocation(req: Request, res: Response) {
  const { itemId } = req.params;
  const { locationId, parLevels } = req.body;

  try {
    const assignment = await inventoryLocationService.createLocationAssignment(itemId, locationId, parLevels);
    res.status(201).json(assignment);
  } catch (err) {
    console.error('[createInventoryLocation]', err);
    res.status(500).json({ message: 'Failed to assign location' });
  }
}

export async function updateInventoryParLevels(req: Request, res: Response) {
  const { itemId, assignmentId } = req.params;
  const { parLevels } = req.body;

  try {
    const updated = await inventoryLocationService.updateParLevels(itemId, assignmentId, parLevels);
    res.json(updated);
  } catch (err) {
    console.error('[updateInventoryParLevels]', err);
    res.status(500).json({ message: 'Failed to update par levels' });
  }
}

export async function deleteInventoryLocation(req: Request, res: Response) {
  const { assignmentId } = req.params;

  try {
    await inventoryLocationService.deleteLocationAssignment(assignmentId);
    res.status(204).send();
  } catch (err) {
    console.error('[deleteInventoryLocation]', err);
    res.status(500).json({ message: 'Failed to delete assignment' });
  }
}