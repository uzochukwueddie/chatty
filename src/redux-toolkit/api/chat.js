import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '@services/api/chat/chat.service';
import { Utils } from '@services/utils/utils.service';

const getConversationList = createAsyncThunk('chat/getUserChatList', async (name, { dispatch }) => {
  try {
    const response = await chatService.getConversationList();
    return response.data;
  } catch (error) {
    Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
  }
});

export { getConversationList };
