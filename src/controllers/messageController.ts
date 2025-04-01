import { Request, Response } from 'express';
import * as MessageService from '../services/messageService';

export const createMessageHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const message = await MessageService.createMessage(req.body);
    if (!message) {
      return res.status(400).json({ message: 'Error creating message' });
    }
    res.status(201).json(message);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const getAllMessagesHandler = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';

    const result = await MessageService.getAllMessages();
    if (!result) {
      res.status(401).json({ message: 'No messages found' });
    }
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const getMessageByIdHandler = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.getMessageById(req.params.id);
    if (!message) {
      res.status(401).json({ message: `Message with Id ${req.params.id} not found` });
    }
    res.status(201).json(message);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const updateMessageHandler = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.updateMessage(req.params.id, req.body);
    if (!message) {
      res.status(401).json({ message: `Message with Id ${req.params.id} not found` });
    }
    res.status(201).json(message);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const deleteMessageHandler = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.deleteMessage(req.params.id);
    if (!message) {
      res.status(401).json({ message: `Message with Id ${req.params.id} not found` });
    }
    res.status(201).json({ message: 'Message deleted' });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', err });
  }
};
