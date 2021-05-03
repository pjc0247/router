import React, { useContext, useMemo, useState } from 'react';

import { useNavigationContext } from './NavigationContext';
import { createEvaluator } from './match';
import { PageContext } from './PageContext';

type RouteProps = {
  path: string;
  children: React.ReactNode;
};
export const Route = ({
  path,
  children,
}: RouteProps) => {
  const navigationContext = useNavigationContext();
  const evaluator = useMemo(() => createEvaluator(path), [path]);
  const params = evaluator(navigationContext.path);

  return (
    <PageContext.Provider
      value={{
        params,
      }}
    >
      <div
        style={{ display: !!params ? 'block' : 'none' }}
      >
        {children}
      </div>
    </PageContext.Provider>
  );
};
