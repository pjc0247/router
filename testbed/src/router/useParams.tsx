import React from 'react';

import { usePageContext } from './PageContext';

export const useParams = (): any => {
  const pageContext = usePageContext();
  return pageContext.params || {};
};
