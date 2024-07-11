import {isEqual} from 'lodash';
import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

const useDeepCompareMemoize = <T>(value: T): T => {
  const ref = useRef<T>(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};
