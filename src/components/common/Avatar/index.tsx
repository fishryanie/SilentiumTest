import React, {useState} from 'react';
import {Block, BlockProps, Image, Text} from 'components/Base';
import {ResizeMode} from 'react-native-fast-image';
import {getInitialsName} from 'utils/helper';
import {COLORS} from 'themes/color';

type AvatarProps = Partial<{
  name: string;
  uri: string;
  size: number;
  resizeMode: ResizeMode;
  fontDecrease: number;
}>;

export const Avatar = ({
  name = '',
  uri,
  size = 50,
  fontDecrease = 3,
  resizeMode = 'cover',
  backgroundColor = COLORS.primary,
  ...props
}: AvatarProps & BlockProps) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const bgColor = uri && !loadFailed ? COLORS.transparent : name ? backgroundColor : COLORS.primary;

  const _renderInner = () => {
    if (uri && !loadFailed) {
      return <Image round={size} onError={() => setLoadFailed(true)} source={{uri}} resizeMode={resizeMode} />;
    } else if (name) {
      if (/^\d+$/.test(name)) {
        // return <Icon solid type={'FontAwesome5'} name="user" color="primary" size={size / fontDecrease} />;
      } else {
        return (
          <Text paddingHorizontal={5} numberOfLines={1} color={COLORS.white} fontSize={size / fontDecrease}>
            {getInitialsName(name.replace(/[^\w\s]/gi, ''))}
          </Text>
        );
      }
    }
  };

  return (
    <Block round={size} contentCenter backgroundColor={bgColor} {...props}>
      {_renderInner()}
    </Block>
  );
};
