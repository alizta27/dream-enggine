import { useCallback, useContext, useRef, useState } from 'react';
import MyContext from '../context/MyContext';
import { useMutation } from 'react-query';
import { defaultSearch } from '../api/searchApi';
import FadeLoader from 'react-spinners/FadeLoader';

const ImageSearch = () => {
  const [infiniteLoading, setInfinitLoading] = useState(false);
  const observer = useRef();
  const { result, setResult, setPage, input, page } = useContext(MyContext);

  const handleInfinitScroll = useMutation(defaultSearch, {
    onSuccess: (res) => {
      setResult([...result, ...res.data.results]);
      setPage(res.meta.page);
      setInfinitLoading(false);
    },
  });

  const lastElement = useCallback(
    (node) => {
      if (infiniteLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page <= 10) {
          setPage(page + 1);
          setInfinitLoading(true);
          handleInfinitScroll.mutate({ input, uri: '/images', page: page + 1 });
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [infiniteLoading, page]
  );

  return (
    <>
      <div className="w-full columns-4 gap-x-8 pt-2">
        {result?.length > 0 &&
          result.map((item, idx) => {
            if (result?.length === idx + 1) {
              return (
                <div className="w-full mt-6" key={idx} ref={lastElement}>
                  <a href={item} target="blank">
                    <img src={item} alt={item} />
                  </a>
                </div>
              );
            } else {
              return (
                <div className="w-full mt-6" key={idx}>
                  <a target="blank" href={item}>
                    <img src={item} alt={item} />
                  </a>
                </div>
              );
            }
          })}
      </div>
      {infiniteLoading && (
        <div className="flex flex-col h-full w-full bg-primary-800">
          <div className="w-full break-words pt-3 pl-10 flex justify-center items-center content-center">
            <FadeLoader color="#ffff" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSearch;
