import React, {ElementType, ForwardedRef, Ref, forwardRef, useCallback} from 'react';
import {Block, Text} from 'components/Base';
import {ActivityIndicator, FlatList, FlatListProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ListProps<T> = FlatListProps<T> & {
  keyExtract?: keyof T;
  isLoading?: boolean;
  isLoadMore?: boolean;
  emptyPlaceholderTitle?: string;
  /**
   * - undefined (default): render default EmptyPlaceholder with emptyPlaceholderTitle
   * - null: not render EmptyPlaceholder
   * - custom: custom EmptyPlaceholder
   */
  EmptyPlaceholderComponent?: ElementType | null;
  LoadingComponent?: ElementType | null;
  safeBottomContent?: number | boolean;
  paddingTopContent?: number;
  backgroundColor?: string;
  ref?: ForwardedRef<FlatList<T>>;
};

const ListInner = <T,>(
  {
    keyExtract,
    isLoading,
    isLoadMore,
    emptyPlaceholderTitle,
    LoadingComponent,
    EmptyPlaceholderComponent,
    ref: _refNotInUse,
    safeBottomContent = true,
    paddingTopContent,
    backgroundColor,
    contentContainerStyle,
    ...props
  }: ListProps<T>,
  ref: Ref<FlatList<T>>,
) => {
  const {bottom} = useSafeAreaInsets();

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      if (keyExtract) {
        return `${item[keyExtract]}`;
      } else {
        return `${index}`;
      }
    },
    [keyExtract],
  );

  const renderFooter = useCallback(() => {
    return isLoadMore ? (
      <Block height={50} contentCenter marginTop={12}>
        <ActivityIndicator size="large" />
      </Block>
    ) : null;
  }, [isLoadMore]);

  const renderEmpty = useCallback(() => {
    return props.data?.length === 0 && !isLoading ? (
      EmptyPlaceholderComponent ? (
        <EmptyPlaceholderComponent />
      ) : EmptyPlaceholderComponent === undefined ? (
        <EmptyPlaceholder title={emptyPlaceholderTitle} />
      ) : null
    ) : null;
  }, [emptyPlaceholderTitle, isLoading, props.data?.length]);

  if (isLoading && LoadingComponent) {
    return <LoadingComponent />;
  }

  return (
    <FlatList
      contentContainerStyle={[
        {
          backgroundColor,
          paddingTop: paddingTopContent,
          paddingBottom: safeBottomContent ? (safeBottomContent === true ? bottom : safeBottomContent) : undefined,
        },
        contentContainerStyle,
      ]}
      onEndReachedThreshold={0.8}
      keyExtractor={keyExtractor}
      ref={ref}
      refreshing={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      {...props}
    />
  );
};

const EmptyPlaceholder = ({
  width = 200,
  height = 200,
  title = 'Không có dữ liệu',
}: {
  width?: number;
  height?: number;
  title?: string;
}) => {
  return (
    <Block flex justifyContent="center" alignItems="center">
      {/* <LottieView loop autoPlay source={LOTTIE.emptyData} style={{width, height}} /> */}
      <Text>{title}</Text>
    </Block>
  );
};

export const List = forwardRef(ListInner) as <T>(props: ListProps<T>) => ReturnType<typeof ListInner>;
