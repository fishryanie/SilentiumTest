import React from 'react';
import {Block, List, Shimmer} from 'components/Base';
import {COLORS} from 'themes/color';

export default function StoryShimmer() {
  return (
    <List
      data={Array.from({length: 10})}
      contentContainerStyle={{gap: 5}}
      backgroundColor={COLORS.bgPrimary}
      renderItem={() => (
        <Block gap={8} padding={12} backgroundColor={COLORS.white}>
          <Block rowCenter>
            <Shimmer width={40} height={40} radius={20} marginRight={12} />
            <Block flex gap={5}>
              <Shimmer width={'60%'} height={10} radius={5} />
              <Shimmer width={'40%'} height={10} radius={5} />
            </Block>
          </Block>
          <Shimmer flex height={10} radius={5} />
          <Shimmer flex height={10} radius={5} />
          <Shimmer flex height={10} radius={5} />
        </Block>
      )}
    />
  );
}
