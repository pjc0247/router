import React from 'react';

import { useNavigationContext } from './NavigationContext';

type ILocation = {
  pathname: string;
};
export const useLocation = (): ILocation => {
  const navigationContext = useNavigationContext();

  return {
    pathname: navigationContext.path,
  };
};
