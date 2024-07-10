import {StoriesApi, StoriesInfo} from 'types/news';
import api from 'utils/axios';

export const fetchStoriesList = async (url: StoriesApi) => {
  try {
    const storyResults = await api.get<number[]>(`${url}.json`);
    const result = await Promise.all(storyResults.slice(0, 20).map(fetchStoriesDetail));
    return result.filter((story): story is StoriesInfo => story !== undefined);
  } catch (error) {
    console.error(`Failed to fetch story list from ${url}:`, error);
  }
};

export const fetchStoriesDetail = async (id: number) => {
  try {
    const result = await api.get<StoriesInfo>(`item/${id}.json`);
    return result;
  } catch (error) {
    console.error(`Failed to fetch story detail for ID ${id}:`, error);
  }
};
