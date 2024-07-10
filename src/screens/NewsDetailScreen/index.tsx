import axios from 'axios';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import React, {useCallback, useEffect, useState} from 'react';
import {NewsDetailScreenProps} from 'types/routes';
import {Block, List, Text} from 'components/Base';
import {Avatar, Header} from 'components/common';
import {CommentInfo} from 'types/comment';
import {decodeHtml} from 'utils/helper';
import {COLORS} from 'themes/color';
import {NewsInfo} from 'types/news';

export default function NewsDetailScreen({route}: NewsDetailScreenProps) {
  const {storyId} = route.params;
  const [story, setStory] = useState<NewsInfo | null>(null);
  const [comments, setComments] = useState<CommentInfo[]>([]);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = useCallback(async () => {
    try {
      const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
      setStory(storyResponse.data);
      if (storyResponse.data.kids) {
        const commentPromises = storyResponse.data.kids.map((id: number) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
        );
        const commentResults = await Promise.all(commentPromises);
        setComments(commentResults.map(result => result.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [storyId]);

  const renderComment = ({item}: {item: CommentInfo}) => {
    const decodedHtml = decodeHtml(item.text);
    return (
      <Block row padding={10} borderTopWidth={1} borderTopColor={COLORS.border}>
        <Avatar name={item.by} size={40} marginRight={12} />
        <Block flex>
          <Text fontSize={15} fontWeight={600} marginBottom={5}>
            {item.by}
          </Text>
          <Text fontSize={12} marginBottom={8}>
            {moment.unix(item.time).fromNow().replace('một', '1')}
          </Text>
          <RenderHTML source={{html: decodedHtml}} baseStyle={{lineHeight: 22}} />
        </Block>
      </Block>
    );
  };

  if (!story) {
    return null;
  }
  return (
    <Block flex backgroundColor={COLORS.white}>
      <Header canGoBack title="News Details" />
      <Block padding={12}>
        <Block
          contentCenter
          radius={5}
          height={30}
          marginBottom={8}
          alignSelf="flex-start"
          paddingHorizontal={15}
          backgroundColor={COLORS.bgSecondary}>
          <Text fontSize={12} textTransform="uppercase" color={COLORS.bgPrimary} style={{fontWeight: 600}}>
            {story.type}
          </Text>
        </Block>
        <Text fontSize={24} marginBottom={10} fontWeight={600} color={COLORS.bgPrimary}>
          {story.title}
        </Text>
        <Text>
          {moment.unix(story.time).format('MMMM MM, YYYY')} by <Text style={{fontWeight: 800}}>{story.by}</Text>
        </Text>
      </Block>
      <List data={comments} renderItem={renderComment} keyExtractor={item => item.id.toString()} />
    </Block>
  );
}
