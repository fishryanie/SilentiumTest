/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import React, {useCallback, useEffect, useState} from 'react';
import {StoriesDetailScreenProps} from 'types/routes';
import {Block, List, Pressable, Text} from 'components/Base';
import {decodeHtml, handleOpenLink} from 'utils/helper';
import {fetchStoriesDetail} from 'services/stories';
import {ActivityIndicator, Image} from 'react-native';
import {fetchCommentList} from 'services/comment';
import {Avatar} from 'components/common';
import {CommentInfo} from 'types/comment';
import {StoriesInfo} from 'types/news';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';
import {ceil} from 'lodash';
import {ICONS} from 'assets';
import StoryDetailHeader from './components/StoryDetailHeader';
import StoryDetailShimmer from './components/StoryDetailShimmer';

export default function StoriesDetailScreen({route}: StoriesDetailScreenProps) {
  const pageSize = 5;
  const {storyId} = route.params;
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [story, setStory] = useState<StoriesInfo>();
  const [comments, setComments] = useState<CommentInfo[]>();

  const handleLoadMore = useCallback(() => {
    if (story?.kids?.length) {
      const totalPages = ceil(story?.kids?.length / pageSize);
      if (page < totalPages && !isLoadMore && !isLoading) {
        setPage(prevPage => prevPage + 1);
      }
    }
  }, [isLoadMore, isLoading, page, story?.kids?.length]);

  const handleRefresh = useCallback(() => {
    initStoriesDetail();
  }, []);

  const initStoriesDetail = async () => {
    try {
      setLoading(true);
      const resStoriesDetail = await fetchStoriesDetail(storyId);
      if (resStoriesDetail) {
        setStory(resStoriesDetail);
        const resCommentList = await fetchCommentList(resStoriesDetail?.kids, page, pageSize);
        if (resStoriesDetail?.kids !== undefined && resStoriesDetail?.kids.length > 0) {
          setComments(resCommentList);
        }
      }
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initStoriesDetail();
  }, []);

  useEffect(() => {
    if (page > 1 && story?.kids !== undefined) {
      setIsLoadMore(true);
      fetchCommentList(story?.kids, page, pageSize)
        .then(newComment => {
          setComments(currentComment => currentComment && [...currentComment, ...newComment]);
        })
        .finally(() => setIsLoadMore(false));
    }
  }, [page, story?.kids]);

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
      <Block height={5} backgroundColor={COLORS.border} />
      <List
        data={comments}
        keyExtract="id"
        isLoading={isLoading}
        isLoadMore={isLoadMore}
        onRefresh={handleRefresh}
        renderItem={({item}) => <CommentItem comment={item} />}
        onEndReached={handleLoadMore}
        LoadingComponent={StoryDetailShimmer}
        style={{backgroundColor: COLORS.bgPrimary}}
        contentContainerStyle={{gap: 5}}
      />
    </Block>
  );
}

const CommentItem = ({comment}: {comment: CommentInfo}) => {
  const pageSize = 3;
  const decodedHtml = decodeHtml(comment.text);
  const [childComments, setChildComments] = useState<CommentInfo[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [childPage, setChildPage] = useState(1);

  const loadMoreChildren = async () => {
    if (!comment.kids) {
      return;
    }
    setLoadingChildren(true);
    const newComments = await fetchCommentList(comment.kids, childPage, pageSize);
    setChildComments(prevComments => [...prevComments, ...newComments]);
    setChildPage(prevPage => prevPage + 1);
    setLoadingChildren(false);
  };

  return (
    <Block row padding={10} backgroundColor={COLORS.white}>
      <Avatar name={comment.by} size={40} marginRight={12} />
      <Block flex>
        <Text fontSize={15} fontWeight={600} marginBottom={5}>
          {comment.by}
        </Text>
        <Text fontSize={12} marginBottom={8}>
          {moment.unix(comment.time).fromNow().replace('một', '1')}
        </Text>
        <RenderHTML contentWidth={width - 70} source={{html: decodedHtml}} baseStyle={{lineHeight: 22}} />
        {childComments.length > 0 && (
          <List
            keyExtract="id"
            data={childComments}
            isLoading={loadingChildren}
            renderItem={({item}) => <CommentItem comment={item} />}
            LoadingComponent={StoryDetailShimmer}
            style={{backgroundColor: COLORS.bgPrimary}}
            contentContainerStyle={{gap: 5}}
          />
        )}
        {comment.kids?.length && comment.kids?.length !== childComments.length && !loadingChildren && (
          <Pressable onPress={loadMoreChildren}>
            <Text>View {comment.kids?.length} answers</Text>
          </Pressable>
        )}
        {loadingChildren && <ActivityIndicator size="small" />}
      </Block>
    </Block>
  );
};
