export type CommentInfo = {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
};
