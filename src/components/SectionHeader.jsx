import { useContext } from 'react';
import MyContext from '../context/MyContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const SectionHeader = () => {
  const navigation = useNavigate();
  const Ctx = useContext(MyContext);
  const {
    input,
    setInput,
    searchDefault,
    searchNews,
    searchImage,
    title,
    handleBtnFilters,
    conditionalsSet,
  } = Ctx;

  const handleSubmit = (e) => {
    e.preventDefault();
    conditionalsSet();
  };

  return (
    <>
      <div className="flex w-full flex-row justify-start items-center gap-5 content-center z-10 py-5 pl-10 bg-primary-800 fixed mb-10">
        <h1
          className="text-primary-100 font-bold text-2xl hover:cursor-pointer"
          onClick={() => navigation('/')}
        >
          {title}
        </h1>
        <div className="flex w-full justify-center items-center content-center">
          <form className="w-full flex" onSubmit={handleSubmit}>
            <input
              className="bg-primary-700 border text-sm rounded-full sm:w-120 md:w-130 w-full lg:w-140 p-2.5 hover:bg-primary-700 hover:border-primary-900 text-primary-100 border-primary-700 focus:bg-primary-700 focus:border-primary-900 hover:shadow-md"
              type="text"
              value={input}
              onChange={(e) => {
                e.preventDefault();
                setInput(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
      <div className="w-full border-b-2 border-primary-400 px-10 mt-20">
        <div className="flex flex-row mt-10 w-full md:w-96 sm:w-96 mb-1 lg:w-96 gap-3">
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
      </div>
    </>
  );
};

export default SectionHeader;
