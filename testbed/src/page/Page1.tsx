import React from 'react';

import { useHistory } from '../router/useHistory';
import { useParams } from '../router/useParams';

export const Page1 = () => {
  const history = useHistory();
  const { value } = useParams();

  return (
    <div>
      PAGE1 {value}
      <button
        onClick={() => history.push(`/page2/${Math.random()}`)}
      >
        Go to Page2
      </button>
    </div>
  );
};
