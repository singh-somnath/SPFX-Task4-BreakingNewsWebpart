import * as React from 'react';
import type { IAllBreakingNewsProps } from './IAllBreakingNewsProps';
import TestGridLayout2 from './GridLayout.test';
import { useEffect, useState } from 'react';
const AllBreakingNews: React.FC<IAllBreakingNewsProps> = (props) => {

 

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoaded(true);
    }, 10); 

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
    {(() => {
        if (loaded) {
          return <TestGridLayout2 context={props.context}/>;
        }
      })()}
    </>
  );
};

export default AllBreakingNews;
