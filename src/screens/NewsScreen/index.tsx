/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Block, List, Pressable, Text} from 'components/Base';
import {StoriesInfo, StoriesMenu} from 'types/news';
import {fetchStoriesList} from 'services/stories';
import {COLORS} from 'themes/color';
import StoryHeader from './components/StoryHeader';
import StoryItem from './components/StoryItem';
import StoryShimmer from './components/StoryShimmer';

const listMenuStories: StoriesMenu[] = [
  {title: 'New Stories', type: 'newstories'},
  {title: 'Best Stories', type: 'beststories'},
  {title: 'Top Stories', type: 'topstories'},
];

export default function NewsScreen() {
  const [stories, setStories] = useState<StoriesInfo[]>();
  const [menuSelected, setMenuSelected] = useState<StoriesMenu>(listMenuStories[0]);
  const [isLoadingStoriesList, setLoadingStoriesList] = useState(false);

  useEffect(() => {
    setLoadingStoriesList(true);
    fetchStoriesList(menuSelected.type)
      .then(setStories)
      .finally(() => setLoadingStoriesList(false));
  }, [menuSelected.type]);

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
            onPress={() => setMenuSelected(item)}
            backgroundColor={menuSelected.type === item.type ? COLORS.primary : COLORS.bgPrimary}>
            <Text color={menuSelected.type === item.type ? COLORS.white : undefined}>{item.title}</Text>
          </Pressable>
        ))}
      </Block>
      <List
        data={stories}
        keyExtract="id"
        isLoading={isLoadingStoriesList}
        renderItem={StoryItem}
        LoadingComponent={StoryShimmer}
        contentContainerStyle={{gap: 5}}
        backgroundColor={COLORS.bgPrimary}
      />
    </Block>
  );
}
