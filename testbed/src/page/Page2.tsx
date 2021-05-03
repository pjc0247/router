import React from 'react';

import { useHistory } from '../router/useHistory';
import { useParams } from '../router/useParams';

export const Page2 = () => {
  const history = useHistory();
  const { value } = useParams();

  return (
    <div>
      PAGE2 {value}
      <button
        onClick={() => history.push(`/page1/${Math.random()}`)}
      >
        Go to Page1
      </button>
    </div>
  );
};
