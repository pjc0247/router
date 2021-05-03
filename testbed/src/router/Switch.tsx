import React, { useContext, useEffect, useState } from 'react';

import { INavigationContext, NavigationContext } from './NavigationContext';

type SwitchProps = {
  children: React.ReactNode;
};
export const Switch = ({
  children,
}: SwitchProps) => {
  const createHistory = (path: string, params: Record<string, any>) => {
    return {
      path,
      params,
    };
  };
  const push = (path: string, params: Record<string, any>) => {
    setValue(value => ({
      ...value,
      path,
      history: [...value.history, createHistory(path, params)],
    }));
    window.history.pushState(params, '', path);
  };
  const goBack = (popHistory = true) => {
    if (value.history.length <= 1)
      return false;

    value.history.pop();
    const prev = value.history[value.history.length - 1];
    setValue(value => ({
      ...value,
      path: prev.path,
      history: [...value.history],
    }));

    if (popHistory)
      window.history.back();
  };

  const [value, setValue] = useState<INavigationContext>({
    path: window.location.pathname,
    history: [createHistory(window.location.pathname, {})],
    push,
    goBack,
  });

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      goBack(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [value]);

  return (
    <NavigationContext.Provider
      value={value}
    >
      {React.Children.map(children, x => (
        <>
          {x}
        </>
      ))}
    </NavigationContext.Provider>
  );
};
