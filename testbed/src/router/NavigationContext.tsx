import React, { useContext } from 'react';

export type INavigationState = {
  path: string;
  params: Record<string, any>;
};
export type INavigationContext = {
  path: string;
  history: INavigationState[];

  push: (path: string, params: Record<string, any>) => void;
  goBack: () => boolean;
};
export const NavigationContext = React.createContext<INavigationContext>({} as any);
export const useNavigationContext = (): INavigationContext => {
  return useContext<INavigationContext>(NavigationContext);
};
