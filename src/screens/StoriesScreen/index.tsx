/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {Block, List, Pressable, Text} from 'components/Base';
import {StoriesInfo, StoriesMenu} from 'types/news';
import {fetchStoriesIdsList, fetchStoriesList} from 'services/stories';
import {COLORS} from 'themes/color';
import StoryHeader from './components/StoryHeader';
import StoryItem from './components/StoryItem';
import StoryShimmer from './components/StoryShimmer';

const listMenuStories: StoriesMenu[] = [
  {title: 'New Stories', type: 'newstories'},
  {title: 'Best Stories', type: 'beststories'},
  {title: 'Top Stories', type: 'topstories'},
];

const pageSize = 10;

export default function StoriesScreen() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [listStories, setListStories] = useState<StoriesInfo[]>();
  const [listStoriesIds, setListStoriesIds] = useState<number[]>();
  const [menuSelected, setMenuSelected] = useState<StoriesMenu>();

  const handleSwitchTab = async (tab: StoriesMenu) => {
    if (tab.type !== menuSelected?.type) {
      try {
        setLoading(true);
        setMenuSelected(tab);
        const resStoriesIdsList = await fetchStoriesIdsList(tab.type);
        if (resStoriesIdsList !== undefined && resStoriesIdsList.length > 0) {
          const resStoriesPage = await fetchStoriesList(resStoriesIdsList, 1, pageSize);
          setListStoriesIds(resStoriesIdsList);
          setListStories(resStoriesPage);
          setPage(1);
        }
      } catch (error) {
        console.error('🚀 ~ handleSwitchTab ~ error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoadMore = useCallback(() => {
    if (!isLoadMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoadMore, isLoading]);

  const handleRefresh = useCallback(() => {
    if (menuSelected?.type) {
      handleSwitchTab(menuSelected);
    }
  }, [menuSelected?.type]);

  useEffect(() => {
    handleSwitchTab(listMenuStories[0]);
  }, []);

  useEffect(() => {
    if (page > 1) {
      setIsLoadMore(true);
      fetchStoriesList(listStoriesIds!, page, pageSize)
        .then(newStories => {
          setListStories(prevStories => prevStories && [...prevStories, ...newStories]);
        })
        .finally(() => setIsLoadMore(false));
    }
  }, [page]);

  return (
    <Block flex backgroundColor={COLORS.white}>
      <StoryHeader />
      <Block rowCenter paddingVertical={15} backgroundColor={COLORS.white}>
        {listMenuStories.map(item => (
          <Pressable
            radius={20}
            marginLeft={12}
            key={item.type}
            paddingVertical={8}
            paddingHorizontal={15}
            onPress={() => handleSwitchTab(item)}
            backgroundColor={menuSelected?.type === item.type ? COLORS.primary : COLORS.bgPrimary}>
            <Text color={menuSelected?.type === item.type ? COLORS.white : undefined}>{item.title}</Text>
          </Pressable>
        ))}
      </Block>
      <List
        data={listStories}
        keyExtract="id"
        isLoading={isLoading}
        isLoadMore={isLoadMore}
        renderItem={StoryItem}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        LoadingComponent={StoryShimmer}
        style={{backgroundColor: COLORS.bgPrimary}}
        contentContainerStyle={{gap: 5}}
      />
    </Block>
  );
}
