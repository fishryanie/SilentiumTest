import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, Pressable, Text} from 'components/Base';
import {COLORS} from 'themes/color';
import {Image} from 'react-native';
import {ICONS} from 'assets';

type HeaderProps = {};

const StoryHeader: React.FC<HeaderProps> = () => {
  const {top} = useSafeAreaInsets();

  return (
    <Block gap={10} paddingTop={top + 12} paddingHorizontal={15} backgroundColor={COLORS.white}>
      <Text fontSize={16}>Hi Silentium 👋 </Text>
      <Block rowCenter>
        <Text flex fontSize={35} fontWeight={700} color={COLORS.primary} style={{letterSpacing: 1}}>
          Stories
        </Text>
        <Pressable contentCenter round={40} backgroundColor={COLORS.bgPrimary}>
          <Image source={{uri: ICONS.ic_search}} width={16} height={16} tintColor={COLORS.primary} />
        </Pressable>
      </Block>
    </Block>
  );
};

export default StoryHeader;
