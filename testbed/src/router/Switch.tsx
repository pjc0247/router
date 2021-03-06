import React, { useContext, useEffect, useState } from 'react';

import { createEvaluator } from './match';
import { INavigationContext, INavigationContextData, NavigationContext } from './NavigationContext';
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

    if (pushHistory) {
      window.history.pushState({
        index: value.cursor,
        path,
        params,
      }, document.title, path);
    }
    setValue(value => {
      return {
        ...value,
        path,
        cursor: value.cursor + 1,
        history: [...value.history.slice(0, value.cursor + 1), createHistory(path, params, route)],
      };
    });
  };
  const goBack = (popHistory = true) => {
    if (value.history.length <= 1)
      return false;

    const prev = value.history[value.history.length - 2];

    setValue(value => {
      if (popHistory)
        window.history.back();
      
      return {
        ...value,
        path: prev.path,
        cursor: value.cursor - 1,
        history: [...value.history],
      };
    });
  };

  const [value, setValue] = useState<INavigationContextData>({
    cursor: -1,
    path: '',
    history: [],
  });

  useEffect(() => {
    push(window.location.pathname, {});
  }, []);
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const { state } = e;
      if (value.cursor > state.index) {
        goBack(false);
      } else {
        setValue(value => ({
          ...value,
          cursor: value.cursor + 1,
        }));
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [value]);

  return (
    <NavigationContext.Provider
      value={{
        ...value,
        push,
        goBack,
      }}
    >
      {value.history.map((history, idx) => (
        <div
          key={idx} // should be ok
          id={`${history.path}_page_${idx}`}
        >
          <Page
            isActive={idx === value.cursor}
            state={history}
            {...(history.route as any).props}
          />
        </div>
      ))}
    </NavigationContext.Provider>
  );
};
