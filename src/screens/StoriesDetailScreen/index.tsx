import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import React, {useEffect, useState} from 'react';
import {StoriesDetailScreenProps} from 'types/routes';
import {Block, List, Pressable, Text} from 'components/Base';
import {decodeHtml, handleOpenLink} from 'utils/helper';
import {fetchStoriesDetail} from 'services/stories';
import {fetchCommentList} from 'services/comment';
import {Avatar} from 'components/common';
import {CommentInfo} from 'types/comment';
import {StoriesInfo} from 'types/news';
import {COLORS} from 'themes/color';
import {Image} from 'react-native';
import {ICONS} from 'assets';
import StoryDetailHeader from './components/StoryDetailHeader';

export default function StoriesDetailScreen({route}: StoriesDetailScreenProps) {
  const {storyId} = route.params;
  const [story, setStory] = useState<StoriesInfo>();
  const [comments, setComments] = useState<CommentInfo[]>();

  useEffect(() => {
    if (storyId) {
      fetchStoriesDetail(storyId).then(setStory);
    }
  }, [storyId]);

  useEffect(() => {
    if (story?.kids && story?.kids.length) {
      fetchCommentList(story?.kids).then(setComments);
    }
  }, [story?.kids, story?.kids?.length]);

  // const fetchStory = useCallback(async () => {
  //   try {
  //     setStory(storyResponse.data);
  //     if (storyResponse.data.kids) {
  //       const commentPromises = storyResponse.data.kids.map((id: number) =>
  //         axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
  //       );
  //       const commentResults = await Promise.all(commentPromises);
  //       setComments(commentResults.map(result => result.data));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [storyId]);

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
      <StoryDetailHeader story={story} />
      <Block gap={5} padding={12}>
        <Text fontSize={15} lineHeight={22} marginBottom={8}>
          {story.title}
        </Text>
        <Block rowCenter>
          <Pressable flex rowCenter gap={3} onPress={() => handleOpenLink(story.url)}>
            <Text fontSize={13} textDecorationLine="underline" color={COLORS.primary}>
              Read more
            </Text>
            <Image source={{uri: ICONS.icArrowDoubleRight}} width={14} height={14} tintColor={COLORS.primary} />
          </Pressable>
          <Block rowCenter gap={20}>
            <Pressable rowCenter gap={5}>
              <Image source={{uri: ICONS.ic_like}} width={20} height={20} tintColor={COLORS.textPrimary} />
              <Text>{story.score}</Text>
            </Pressable>
            <Pressable rowCenter gap={5}>
              <Image source={{uri: ICONS.ic_comment}} width={20} height={20} tintColor={COLORS.textPrimary} />
              <Text>{story.descendants}</Text>
            </Pressable>
          </Block>
        </Block>
      </Block>
      <List data={comments} renderItem={renderComment} keyExtractor={item => item.id.toString()} />
    </Block>
  );
}
