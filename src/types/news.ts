export type StoriesApi = 'newstories' | 'beststories' | 'topstories';
export type StoriesMenu = {title: string; type: StoriesApi};
export type StoriesInfo = {
  id: number;
  by: string;
  url: string;
  title: string;
  time: number;
  score: number;
  kids: number[];
  descendants: number;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
};
