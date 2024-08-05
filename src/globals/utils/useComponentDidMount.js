import { useEffect } from 'react';

export default function useComponentDidMount(callback) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
}
