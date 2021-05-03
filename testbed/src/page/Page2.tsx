import React from 'react';

import { useHistory } from '../router/useHistory';
import { useLocation } from '../router/useLocation';
import { useParams } from '../router/useParams';

export const Page2 = () => {
  const history = useHistory();
  const location = useLocation();
  const { value } = useParams();

  return (
    <div>
      PAGE2 {value}
      <br />
      {location.pathname}
      <button
        onClick={() => history.push(`/page1/${+value + 1}`)}
      >
        Go to Page1
      </button>
    </div>
  );
};
