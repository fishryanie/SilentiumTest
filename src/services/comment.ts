import {CommentInfo} from 'types/comment';
import api from 'utils/axios';

export const fetchCommentList = async (ids: number[], page: number, pageSize: number): Promise<CommentInfo[]> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageIds = ids.slice(start, end);
  const pageResults = await Promise.all(pageIds.map(fetchCommentDetail));
  return pageResults.filter((story): story is CommentInfo => story !== undefined);
};

export const fetchCommentDetail = async (id: number) => {
  try {
    const result = await api.get<CommentInfo>(`item/${id}.json`);
    return result;
  } catch (error) {
    console.error(`Failed to fetch comment detail for ID ${id}:`, error);
  }
};
