import React from 'react';
import moment from 'moment';
import {Block, Pressable, Text} from 'components/Base';
import {Image, ListRenderItem} from 'react-native';
import {handleOpenLink} from 'utils/helper';
import {Avatar} from 'components/common';
import {StoriesInfo} from 'types/news';
import {COLORS} from 'themes/color';
import {navigationRef} from 'routes';
import {ICONS} from 'assets';

const StoryItem: ListRenderItem<StoriesInfo> = ({item}) => (
  <Pressable
    gap={5}
    padding={12}
    backgroundColor={COLORS.white}
    onPress={() => navigationRef.navigate('NewsDetailScreen', {storyId: item.id})}>
    <Block row>
      <Avatar name={item.by} size={40} marginRight={12} />
      <Block gap={5}>
        <Text fontSize={16} fontWeight={600} color={COLORS.primary}>
          {item.by}
        </Text>
        <Text fontSize={12} marginBottom={8}>
          {moment.unix(item.time).fromNow().replace('một', '1')}
        </Text>
      </Block>
    </Block>
    <Text fontSize={15} lineHeight={22} marginBottom={8}>
      {item.title}
    </Text>
    <Block rowCenter>
      <Pressable flex rowCenter gap={3} onPress={() => handleOpenLink(item.url)}>
        <Text fontSize={13} textDecorationLine="underline" color={COLORS.primary}>
          Read more
        </Text>
        <Image source={{uri: ICONS.icArrowDoubleRight}} width={14} height={14} tintColor={COLORS.primary} />
      </Pressable>
      <Block rowCenter gap={20}>
        <Pressable rowCenter gap={5}>
          <Image source={{uri: ICONS.ic_like}} width={20} height={20} tintColor={COLORS.textPrimary} />
          <Text>{item.score}</Text>
        </Pressable>
        <Pressable rowCenter gap={5}>
          <Image source={{uri: ICONS.ic_comment}} width={20} height={20} tintColor={COLORS.textPrimary} />
          <Text>{item.descendants}</Text>
        </Pressable>
      </Block>
    </Block>
  </Pressable>
);

export default StoryItem;
