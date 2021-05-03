import React from 'react';
import { useFocusEffect } from '../router';

import { useHistory } from '../router/useHistory';
import { useParams } from '../router/useParams';

export const Page1 = () => {
  const history = useHistory();
  const { value } = useParams();

  useFocusEffect(() => {
    console.log(`hye world ` + value);
    return () => {
      console.log(`bye world ` + value);
    };
  });

  return (
    <div>
      PAGE1 {value}
      <button
        onClick={() => history.push(`/page2/${+value + 1}`)}
      >
        Go to Page2
      </button>
    </div>
  );
};
