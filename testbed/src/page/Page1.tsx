import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '../router';

import { useHistory } from '../router/useHistory';
import { useParams } from '../router/useParams';

export const Page1 = () => {
  const history = useHistory();
  const { value } = useParams();
  const [v, setV] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setV(1);
    }, 1000);
  }, []);

  useFocusEffect(React.useCallback(() => {
    console.log(`hye world ` + v);
    return () => {
      console.log(`bye world ` + v);
    };
  }, [v]));

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
