import { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import FadeLoader from 'react-spinners/FadeLoader';
import SectionHeader from '../components/SectionHeader';
import Pagination from '../components/Pagination';
import DefaultSearch from '../components/DefaultSearch';
import ImageSearch from '../components/ImageSearch';
import NewsSearch from '../components/NewsSearch';

const SearchPage = () => {
  const {
    searchDefault,
    searchImage,
    searchNews,
    loading,
    setLoading,
    setInput,
    conditionalsGet,
    result,
    handleBtnFilters,
  } = useContext(MyContext);

  useEffect(() => {
    const input = localStorage.getItem('search');
    setInput(input);
    const position = localStorage.getItem('position');
    handleBtnFilters(position);
    setLoading(true);
    conditionalsGet(searchDefault, searchImage, searchNews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDefault, searchImage, searchNews]);
  console.log(result, '==== result ========');
  if (!loading) {
    return (
      <div className="flex flex-col h-full w-full bg-primary-800">
        <SectionHeader />
        {searchDefault && (
          <div className="w-full sm:w-130 md:w-140 lg:w-140 xl:w-140 break-words pt-3 pl-10">
            <DefaultSearch />
            <Pagination />
          </div>
        )}
        {searchNews && (
          <div className="w-full sm:w-140 md:w-md-p lg:w-md-p xl:w-md-p break-words pt-3 pl-10">
            <NewsSearch />
            <Pagination />
          </div>
        )}
        {searchImage && <ImageSearch />}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-full w-full bg-primary-800">
        <SectionHeader />
        <div className="w-full break-words pt-3 pl-10 flex justify-center items-center content-center">
          <FadeLoader color="#ffff" />
        </div>
      </div>
    );
  }
};

export default SearchPage;
