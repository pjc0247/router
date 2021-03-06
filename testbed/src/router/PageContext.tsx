import React, { useContext } from 'react';

export type IPageContext = {
  isActive: boolean;
  path: string;
  params: Record<string, any>;
};
export const PageContext = React.createContext<IPageContext>({} as any);
export const usePageContext = (): IPageContext => {
  return useContext<IPageContext>(PageContext);
};
