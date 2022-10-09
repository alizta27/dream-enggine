import { createContext, useState } from 'react';
import { title } from '../constant';
import { useMutation } from 'react-query';
import { defaultSearch } from '../api/searchApi';

const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [searchDefault, setSearchDefault] = useState(false);
  const [searchImage, setSearchImage] = useState(false);
  const [searchNews, setSearchNews] = useState(false);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(0);
  const [peopleAsk, setPeopleAsk] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBtnFilters = (filter) => {
    switch (filter) {
      case 'news':
        setSearchNews(true);
        setSearchImage(false);
        setSearchDefault(false);
        localStorage.setItem('position', 'news');
        break;
      case 'images':
        setSearchNews(false);
        setSearchImage(true);
        setSearchDefault(false);
        localStorage.setItem('position', 'images');
        break;
      default:
        setSearchDefault(true);
        setSearchImage(false);
        setSearchNews(false);
        localStorage.setItem('position', 'default');
        break;
    }
  };

  const handleDefault = useMutation(defaultSearch, {
    onSuccess: (res) => {
      if (res) {
        setLoading(false);
        if (searchDefault) {
          setResult(res.data.organic);
          setPage(res.meta.page);
          setPeopleAsk(res.data.people_also_ask);
        } else if (searchImage) {
          setResult(res.data.results);
          setPage(res.meta.page);
        } else {
          setResult(res.data.results);
          setPage(res.meta.page);
        }
      }
    },
  });

  const conditionalsSet = () => {
    if (input.replace(/\s/g, '') !== '') {
      setLoading(true);
      localStorage.setItem('search', input);
      if (searchDefault) {
        handleDefault.mutate({ input, uri: '/organic-search' });
      } else if (searchImage) {
        handleDefault.mutate({ input, uri: '/images' });
      } else {
        handleDefault.mutate({ input, uri: '/news' });
      }
    }
  };
  const conditionalsGet = (searchDefault, searchImage, searchNews) => {
    const input = localStorage.getItem('search');
    const position = localStorage.getItem('position');
    handleBtnFilters(position);
    setInput(input);

    if (input.replace(/\s/g, '') !== '') {
      setLoading(true);
      if (searchDefault) {
        handleDefault.mutate({ input, uri: '/organic-search' });
      }
      if (searchImage) {
        handleDefault.mutate({ input, uri: '/images' });
      }
      if (searchNews) {
        handleDefault.mutate({ input, uri: '/news' });
      }
    }
  };

  const contextValues = {
    conditionalsGet,
    input,
    searchDefault,
    peopleAsk,
    setPeopleAsk,
    searchImage,
    searchNews,
    handleDefault,
    conditionalsSet,
    setInput,
    setSearchDefault,
    setSearchImage,
    setSearchNews,
    result,
    setResult,
    loading,
    setLoading,
    title,
    page,
    setPage,
    handleBtnFilters,
  };

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};

export default MyContext;
