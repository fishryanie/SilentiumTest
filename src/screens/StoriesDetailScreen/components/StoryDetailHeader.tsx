import React from 'react';
import moment from 'moment';
import {Block, Pressable, Text} from 'components/Base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from 'routes';
import {Avatar} from 'components/common';
import {COLORS} from 'themes/color';
import {StoriesInfo} from 'types/stories';
import {Image} from 'react-native';
import {hs} from 'themes/helper';
import {ICONS} from 'assets';

type StoryDetailHeaderProps = {
  story: StoriesInfo;
};

const StoryDetailHeader: React.FC<StoryDetailHeaderProps> = ({story}) => {
  const {top} = useSafeAreaInsets();

  return (
    <Block row paddingTop={top + 12} paddingHorizontal={12}>
      <Pressable contentCenter round={40} marginRight={12} onPress={navigationRef.goBack}>
        <Image source={{uri: ICONS.ic_back}} width={hs(25)} height={hs(25)} tintColor={COLORS.textPrimary} />
      </Pressable>
      <Block row>
        <Avatar name={story.by} size={40} marginRight={12} />
        <Block gap={5}>
          <Text fontSize={16} fontWeight={600} color={COLORS.primary}>
            {story.by}
          </Text>
          <Text fontSize={12}>{moment.unix(story.time).fromNow().replace('một', '1')}</Text>
        </Block>
      </Block>
    </Block>
  );
};

export default StoryDetailHeader;
