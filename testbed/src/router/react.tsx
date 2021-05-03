import React from 'react';

type InterpretedReactChild = {
  type: string;
  props: Record<string, any>;
};

// React의 undocumented 값들을 특정 포멧에 맞게 꺼낸다.
// 나중에 React 구현이 변경되거나, 버전별로 다르게 작성해야 할 때 유연하게 대응하기 위한 용도
export const interpretReactChild = (x: any) => {
  return {
    type: x.type.name,
    props: x.props,
  } as InterpretedReactChild;
};
export const interpretReactChildren = (x: React.ReactNode) => {
  return React.Children.toArray(x).map(interpretReactChild);
};
