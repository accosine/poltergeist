import React from 'react';

const useInfiniteScroll = (callback, scrollRef, threshold = 30) => {
  const [isFetching, setIsFetching] = React.useState(false);

  const handleScroll = React.useCallback(() => {
    const scrollElement = scrollRef.current;
    // if scrolled beyond threshold or element not overflowing at all
    if (
      scrollElement.scrollHeight -
        (scrollElement.scrollTop + scrollElement.offsetHeight) <
        threshold ||
      scrollElement.scrollHeight <= scrollElement.clientHeight
    ) {
      setIsFetching(true);
    }
  }, [scrollRef, threshold]);

  React.useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [scrollRef, handleScroll]);

  React.useEffect(() => {
    if (isFetching) return;
    callback();
  }, [isFetching]);
};

export default useInfiniteScroll;
