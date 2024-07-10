import Toast from 'react-native-toast-message';
import {Linking} from 'react-native';
import {ToastProps} from 'types/common';

export const getInitialsName = (name: string): string => {
  const words = name.split(' ');
  let result = '';
  for (const word of words) {
    result += word.charAt(0).toUpperCase();
  }
  if (!result) {
    console.warn('Could not get abbr from name');
    result = name;
  }
  return result;
};

export const decodeHtml = (html: string): string => {
  if (!html) {
    return '';
  }
  const entities: {[key: string]: string} = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
    '&hellip;': '…',
  };
  return html.replace(/&[^\s;]+;/g, entity => {
    return entities[entity] || entity;
  });
};

export const showToast = (toastProps: ToastProps) => {
  return Toast.show({...toastProps, type: 'ToastMessage', props: {status: toastProps.type, action: toastProps.action}});
};

export const handleOpenLink = async (link?: string) => {
  if (!link) {
    return showToast({type: 'error', text1: 'Không tìm thấy link', text2: link});
  }
  try {
    const supported = await Linking.openURL(link);
    if (!supported) {
      showToast({type: 'error', text1: 'Không thể mở liên kết', text2: link});
    }
  } catch (error) {
    console.log('🚀 ~ handleOpenLink ~ error:', error);
  }
};
