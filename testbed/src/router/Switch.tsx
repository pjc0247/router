import React, { useContext, useEffect, useState } from 'react';

import { createEvaluator } from './match';
import { INavigationContext, NavigationContext } from './NavigationContext';
import { Page } from './Page';
import { interpretReactChildren } from './react';

type SwitchProps = {
  children: React.ReactNode;
};
export const Switch = ({
  children,
}: SwitchProps) => {
  const getMatchingRoute = (path: string) => {
    const routes = interpretReactChildren(children);
    const first = routes
      .filter(x => x.type === 'Route')
      .filter(x => createEvaluator(x.props.path)(path))
      [0];
    return first;
  };
  const getFallbackPath = () => {
    const routes = interpretReactChildren(children);
    return routes
      .filter(x => x.type === 'Redirect')[0]?.props?.to || '/';
  };

  const createHistory = (path: string, params: Record<string, any>, route: any) => {
    return {
      path,
      params,
      route,
    };
  };
  const push = (path: string, params: Record<string, any>, pushHistory = true) => {
    const route = getMatchingRoute(path);
    if (!route) {
      push(getFallbackPath(), {}, pushHistory);
      return;
    }

    setValue(value => {
      if (pushHistory) {
        window.history.pushState({
          index: value.history.length,
          path,
          params,
        }, document.title, path);
      }

      return {
        ...value,
        path,
        history: [...value.history, createHistory(path, params, route)],
      };
    });
  };
  const goBack = (popHistory = true) => {
    if (value.history.length <= 1)
      return false;

    value.history.pop();
    const prev = value.history[value.history.length - 1];
    setValue(value => {
      if (popHistory)
        window.history.back();
      else {
        window.history.replaceState({
          index: value.history.length - 1,
          path: prev.path,
          params: prev.params,
        }, document.title, prev.path);
      }
      
      return {
        ...value,
        path: prev.path,
        history: [...value.history],
      };
    });
  };

  const [value, setValue] = useState<INavigationContext>({
    path: '',
    history: [],
    push,
    goBack,
  });

  useEffect(() => {
    push(window.location.pathname, {});
  }, []);
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const { state } = e;
      if (value.history.length > state.index) {
        goBack(false);
      } else {
        push(state.path, state.params, false);
      }
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
        <div
          key={idx}
          id={`${history.path}_page_${idx}`}
        >
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
