import { useContext } from 'react';
import MyContext from '../context/MyContext';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Pagination = () => {
  const Ctx = useContext(MyContext);
  const {
    page,
    title,
    setLoading,
    searchImage,
    input,
    searchDefault,
    handleDefault,
  } = Ctx;

  const handlePagination = (page) => {
    if (input.replace(/\s/g, '') !== '') {
      setLoading(true);
      if (searchDefault) {
        handleDefault.mutate({
          input,
          uri: '/organic-search',
          page: page,
        });
      } else if (searchImage) {
        handleDefault.mutate({ input, uri: '/images' });
      } else {
        handleDefault.mutate({ input, uri: '/news', page: page });
      }
    }
  };

  return (
    <div className="flex my-10 justify-center items-center content-center">
      {page > 1 ? (
        <div className="flex items-center gap-5">
          <FaChevronLeft
            className="hover:cursor-pointer"
            color="rgb(138 180 248)"
            onClick={() => {
              let pages = page > 1 ? page - 1 : 1;
              handlePagination(pages);
            }}
            size={20}
          />
          <h1 className="text-primary-100 text-3xl">{title}</h1>
          <FaChevronRight
            className="hover:cursor-pointer"
            color="rgb(138 180 248)"
            onClick={() => {
              handlePagination(page + 1);
            }}
            size={20}
          />
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <h1 className="text-primary-100 text-3xl">{title}</h1>
          <FaChevronRight
            className="hover:cursor-pointer"
            color="rgb(138 180 248)"
            onClick={() => {
              handlePagination(page + 1);
            }}
            size={20}
          />
        </div>
      )}
    </div>
  );
};
export default Pagination;
