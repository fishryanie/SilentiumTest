import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type NewsDetailScreenProps = RootStackScreenProps<'NewsDetailScreen'>;

export type RootStackParamList = {
  NewsScreen: undefined;
  NewsDetailScreen: {storyId: number};
};
