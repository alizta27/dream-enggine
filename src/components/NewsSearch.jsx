import { useContext } from 'react';
import MyContext from '../context/MyContext';

const NewsSearch = () => {
  const Ctx = useContext(MyContext);
  const { result } = Ctx;

  return (
    <>
      {result?.length > 0 &&
        result.map((item, idx) => {
          return (
            <a href={item?.url} target="_blank" rel="noreferrer" key={idx}>
              <div className="w-full mt-6 hover:cursor-pointer">
                <div className="flex flex-row justify-between">
                  <div className="flex  flex-col w-full">
                    <div className="flex flex-row gap-3">
                      <img
                        src={item?.source?.image}
                        alt={item?.source?.image}
                      />
                      <p className="text-primary-100 text-xs">
                        {item?.source?.name}
                      </p>
                    </div>
                    <p className="text-blue-50 text-xl mt-2">{item?.title}</p>
                    <p className="text-primary-100 text-lg mt-2">
                      {item?.snippet}
                    </p>
                  </div>
                  <div className="w-24 h-24">
                    <img
                      src={item?.image}
                      alt={item?.image}
                      className="rounded-md w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
    </>
  );
};

export default NewsSearch;
