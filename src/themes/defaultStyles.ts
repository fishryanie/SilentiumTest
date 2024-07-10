import {StyleSheet} from 'react-native';

export const DEFAULT_STYLES = StyleSheet.create({
  row: {flexDirection: 'row'},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  contentCenter: {justifyContent: 'center', alignItems: 'center'},
  wrap: {flexWrap: 'wrap'},
  absoluteFillObject: StyleSheet.absoluteFillObject,
});
