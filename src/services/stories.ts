import {StoriesApi, StoriesInfo} from 'types/news';
import api from 'utils/axios';

export const fetchStoriesIdsList = async (url: StoriesApi) => {
  try {
    const result = await api.get<number[]>(`${url}.json`);
    return result;
  } catch (error) {
    console.error(`Failed to fetch story list from ${url}:`, error);
  }
};

export const fetchStoriesList = async (ids: number[], page: number, pageSize: number): Promise<StoriesInfo[]> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageIds = ids.slice(start, end);
  const pageResults = await Promise.all(pageIds.map(fetchStoriesDetail));
  return pageResults.filter((story): story is StoriesInfo => story !== undefined);
};

export const fetchStoriesDetail = async (id: number) => {
  try {
    const result = await api.get<StoriesInfo>(`item/${id}.json`);
    return result;
  } catch (error) {
    console.error(`Failed to fetch story detail for ID ${id}:`, error);
  }
};
