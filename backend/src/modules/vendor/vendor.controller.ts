import { Request, Response } from 'express';
import * as vendorService from './vendor.service';

export async function getVendors(req: Request, res: Response) {
  const vendors = await vendorService.getAllVendors();
  res.json(vendors);
}

export async function getVendor(req: Request, res: Response) {
  const vendor = await vendorService.getVendorById(req.params.id);
  if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
  res.json(vendor);
}

export async function createVendor(req: Request, res: Response) {
  const vendor = await vendorService.createVendor(req.body);
  res.status(201).json(vendor);
}

export async function updateVendor(req: Request, res: Response) {
  const vendor = await vendorService.updateVendor(req.params.id, req.body);
  res.json(vendor);
}

export async function deleteVendor(req: Request, res: Response) {
  await vendorService.deleteVendor(req.params.id);
  res.status(204).end();
}

export async function createVendorContact(req: Request, res: Response) {
  const vendorId = req.params.vendorId;
  const contact = await vendorService.createVendorContact(vendorId, req.body);
  res.status(201).json(contact);
}

export async function updateVendorContact(req: Request, res: Response) {
  const contactId = req.params.contactId;
  const contact = await vendorService.updateVendorContact(contactId, req.body);
  res.json(contact);
}

export async function deleteVendorContact(req: Request, res: Response) {
  await vendorService.deleteVendorContact(req.params.contactId);
  res.status(204).end();
}

export async function assignVendorItems(req: Request, res: Response) {
  const vendorId = req.params.vendorId;
  const items = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid payload format' });
  }

  await vendorService.assignVendorItems(vendorId, items);
  res.status(204).end();
}
