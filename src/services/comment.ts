import {CommentInfo} from 'types/comment';
import api from 'utils/axios';

export const fetchCommentList = async (arrayKids: number[]) => {
  try {
    const result = await Promise.all(arrayKids.slice(0, 20).map(fetchCommentDetail));
    return result.filter((story): story is CommentInfo => story !== undefined);
  } catch (error) {
    console.error('Failed to fetch comment list:', error);
  }
};

export const fetchCommentDetail = async (id: number) => {
  try {
    const result = await api.get<CommentInfo>(`item/${id}.json`);
    return result;
  } catch (error) {
    console.error(`Failed to fetch comment detail for ID ${id}:`, error);
  }
};
