import React from 'react';

import { usePageContext } from './PageContext';

type ILocation = {
  pathname: string;
  params: Record<string, any>;
};
export const useLocation = (): ILocation => {
  const {
    path,
    params,
  } = usePageContext();

  return {
    pathname: path,
    params,
  };
};
