import React, { useContext } from 'react';

export type INavigationState = {
  path: string;
  params: Record<string, any>;
  route: React.ReactNode;
};
export interface INavigationContextData {
  path: string;
  history: INavigationState[];
};
export interface INavigationContext extends INavigationContextData {
  push: (path: string, params: Record<string, any>) => void;
  goBack: () => boolean;
}

export const NavigationContext = React.createContext<INavigationContext>({} as any);
export const useNavigationContext = (): INavigationContext => {
  return useContext<INavigationContext>(NavigationContext);
};
