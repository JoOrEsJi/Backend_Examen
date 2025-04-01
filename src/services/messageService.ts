import MessageModel, { IMessage } from '../models/message';

export const createMessage = async (message: IMessage) => {
  const newMessage = new MessageModel(message);
  return await newMessage.save();
};

export const getAllMessages = async () => {
  return await MessageModel.find()
    .populate('sender', 'username')
    .populate('receiver', 'username');
};

export const getMessageById = async (id: string) => {
  return await MessageModel.findById(id)
    .populate('sender', 'username')
    .populate('receiver', 'username');
};

export const updateMessage = async (id: string, message: IMessage) => {
  return await MessageModel.findByIdAndUpdate(id, message, { new: true });
};

export const deleteMessage = async (id: string) => {
  return await MessageModel.findByIdAndDelete(id);
};
