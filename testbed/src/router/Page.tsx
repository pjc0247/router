import React, { useMemo } from 'react';

import { INavigationState } from './NavigationContext';
import { createEvaluator } from './match';
import { PageContext } from './PageContext';

type PageProps = {
  isActive: boolean;
  path: string;
  state: INavigationState;
  children: React.ReactNode;
};
export const Page = ({
  isActive,
  path,
  state,
  children,
}: PageProps) => {
  const evaluator = useMemo(() => createEvaluator(path), [path]);
  const params = evaluator(state.path);

  return (
    <PageContext.Provider
      value={{
        params,
      }}
    >
      <div
        style={{ display: isActive ? 'block' : 'none' }}
      >
        {children}
      </div>
    </PageContext.Provider>
  );
};
