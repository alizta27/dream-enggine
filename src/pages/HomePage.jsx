import Button from '../components/Button';
import { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const {
    input,
    setInput,
    searchDefault,
    searchNews,
    searchImage,
    setLoading,
    title,
    handleBtnFilters,
  } = useContext(MyContext);
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.replace(/\s/g, '') !== '') {
      setLoading(true);
      localStorage.setItem('search', input);
      navigation('/search');
    }
  };

  useEffect(() => {
    localStorage.removeItem('search');
    localStorage.removeItem('position');
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-primary-800">
      <div className="flex flex-row items-center gap-5 self-end p-2">
        <Button
          isActive={searchDefault}
          onBtnClick={() => handleBtnFilters('default')}
        >
          All
        </Button>
        <Button
          isActive={searchImage}
          onBtnClick={() => handleBtnFilters('images')}
        >
          Images
        </Button>
        <Button
          isActive={searchNews}
          onBtnClick={() => handleBtnFilters('news')}
        >
          News
        </Button>
      </div>
      <div className="flex flex-col gap-10 mt-36">
        <h1 className="text-primary-100 font-bold text-7xl self-center">
          {title}
        </h1>
        <div className="w-full flex justify-center items-center content-center">
          <form onSubmit={handleSubmit} className="w-full flex justify-center">
            <input
              className="bg-primary-800 border  text-sm rounded-full w-110 sm:w-130 lg:w-130 p-2.5 hover:bg-primary-700 hover:border-primary-900 text-primary-100 border-primary-100 focus:bg-primary-700 focus:ring-primary-900 hover:shadow-md focus:border-primary-900"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
