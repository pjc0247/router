import React from 'react';

import { useNavigationContext } from './NavigationContext';

type IHistory = {
  push: (path: string) => void;
  goBack: () => boolean;
};
export const useHistory = (): IHistory => {
  const navigationContext = useNavigationContext();

  const push = (path: string, params: Record<string, any> = {}) => {
    console.log('push, ' , path);
    navigationContext.push(path, params);
  };
  const goBack = (): boolean => {
    return navigationContext.goBack();
  };

  return {
    push,
    goBack,
  };
};
