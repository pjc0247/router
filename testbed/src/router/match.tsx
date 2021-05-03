import match from 'path-match';

const route = match({
  sensitive: false,
  strict: false,
  end: false,
});
export const createEvaluator = (path: string) => {
  return route(path);
};
