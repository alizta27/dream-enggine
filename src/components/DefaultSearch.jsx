import { useContext } from 'react';
import MyContext from '../context/MyContext';

const DefaultSearch = () => {
  const Ctx = useContext(MyContext);
  const {
    result,
    peopleAsk,
    setInput,
    setLoading,
    searchDefault,
    handleDefault,
    input,
    page,
  } = Ctx;

  const handlePeopleAlsoAsk = () => {
    if (input.replace(/\s/g, '') !== '') {
      setLoading(true);
      if (searchDefault) {
        handleDefault.mutate({
          input,
          uri: '/organic-search',
          page: page,
        });
      }
    }
  };

  return (
    <>
      {result.length > 0 &&
        result.map((item, idx) => {
          return (
            <a href={item.url} target="blank" key={idx}>
              <div className="w-full mt-6">
                <p className="text-primary-100 text-md">{item.url}</p>
                <h2 className="text-blue-50 text-xl hover:underline hover:cursor-pointer">
                  {item.title}
                </h2>
                <p className="text-primary-100 text-md">{item.snippet}</p>
              </div>
            </a>
          );
        })}
      <div className="grid grid-cols-2 gap-4 mt-10">
        {peopleAsk.length > 0 &&
          peopleAsk.map((item, idx) => {
            return (
              <div
                className="border-2 rounded-full border-primary-700 flex items-center px-5 py-2 bg-primary-700"
                key={idx}
              >
                <p
                  className="text-primary-100 hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setInput(item.question);
                    handlePeopleAlsoAsk();
                  }}
                >
                  {item.question}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DefaultSearch;
