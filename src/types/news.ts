export type NewsInfo = {
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
