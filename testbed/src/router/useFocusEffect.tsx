import React, { useEffect } from 'react';

import { usePageContext } from './PageContext';

export const useFocusEffect = (callback: () => void) => {
  const {
    isActive,
  } = usePageContext();
  
  useEffect(() => {
    if (!isActive) return;
    const disposer = callback();
    return disposer;
  }, [isActive]);
};
