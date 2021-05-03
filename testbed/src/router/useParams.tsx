import React from 'react';

import { usePageContext } from './PageContext';

export const useParams = <T extends unknown>(): T => {
  const pageContext = usePageContext();
  return (pageContext.params || {}) as T;
};
