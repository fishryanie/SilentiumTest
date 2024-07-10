/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Block, List, Text} from 'components/Base';
import {TouchableOpacity} from 'react-native';
import {Header} from 'components/common';
import {navigationRef} from 'routes';
import {NewsInfo} from 'types/news';

export default function NewsScreen() {
  const [stories, setStories] = useState<NewsInfo[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json`);
      const storyIds = response.data.slice((page - 1) * 10, page * 10);
      const storyPromises = storyIds.map((id: number) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
      );
      const storyResults = await Promise.all(storyPromises);
      setStories(storyResults.map(result => result.data));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item}: {item: NewsInfo}) => (
    <TouchableOpacity onPress={() => navigationRef.navigate('NewsDetailScreen', {storyId: item.id})}>
      <Block padding={20} borderTopWidth={1} borderTopColor={'#ccc'}>
        <Text fontSize={18}>{item.title}</Text>
      </Block>
    </TouchableOpacity>
  );

  return (
    <Block flex>
      <Header />
      <List
        data={stories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => setPage(prevPage => prevPage + 1)}
        onEndReachedThreshold={0.5}
      />
    </Block>
  );
}
