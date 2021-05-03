import React, { useContext, useEffect, useState } from 'react';

import { createEvaluator } from './match';
import { INavigationContext, NavigationContext } from './NavigationContext';
import { Page } from './Page';

type SwitchProps = {
  children: React.ReactNode;
};
export const Switch = ({
  children,
}: SwitchProps) => {
  const getMatchingRoute = (path: string) => {
    const routes = React.Children.toArray(children);
    const first = routes
      .filter((x: any) => createEvaluator(x.props.path)(path))
      [0];
    return first;
  };
  const createHistory = (path: string, params: Record<string, any>) => {
    const route = getMatchingRoute(path);
    return {
      path,
      params,
      route,
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
      {value.history.map((history, idx) => (
        <div id={`page_${idx}`}>
          <Page
            isActive={idx === value.history.length - 1}
            state={history}
            {...(history.route as any).props}
          />
        </div>
      ))}
    </NavigationContext.Provider>
  );
};
