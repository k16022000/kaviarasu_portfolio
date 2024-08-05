import { useEffect } from 'react';

export default function useComponentWillUnmount(callBack) {
  useEffect(() => () => {
    callBack();
    // eslint-disable-next-line
  }, []);
}
