import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, BlockProps, Image, Pressable, Text} from 'components/Base';
import {navigationRef} from 'routes';
import {COLORS} from 'themes/color';
import {ICONS} from 'assets';

type HeaderProps = Partial<{
  onGoBack: () => void;
  rightOnPress: () => void;
  title: string;
  canGoBack: boolean;
  titleSize: number;
  backgroundColor: string;
  IconRight: React.ReactNode;
  containerStyle: BlockProps;
}>;

export const Header: React.FC<HeaderProps> = props => {
  const {top} = useSafeAreaInsets();
  const {
    title,
    titleSize = 18,
    canGoBack,
    IconRight,
    containerStyle,
    rightOnPress,
    onGoBack = navigationRef.goBack,
  } = props;
  return (
    <Block rowCenter paddingTop={top + 5} paddingHorizontal={12} {...containerStyle}>
      {canGoBack ? (
        <Pressable contentCenter round={40} backgroundColor={COLORS.bgSecondary} onPress={onGoBack}>
          <Image source={{uri: ICONS.back}} square={20} />
        </Pressable>
      ) : (
        <Block square={40} />
      )}
      <Text flex textAlign="center" fontWeight={600} fontSize={titleSize} color={COLORS.bgPrimary}>
        {title}
      </Text>
      {IconRight ? (
        <Pressable contentCenter round={40} backgroundColor={COLORS.bgSecondary} onPress={rightOnPress}>
          {IconRight}
        </Pressable>
      ) : (
        <Block square={40} />
      )}
    </Block>
  );
};
