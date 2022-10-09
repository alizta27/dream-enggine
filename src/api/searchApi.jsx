import axios from 'axios';

const optionsDefault = {
  query: '',
  gl: 'ID',
  hl: 'in_ID',
  device: 'desktop',
  duration: '',
  autocorrect: 0,
  page: 1,
  uule: '1',
  pages: 1,
};

const optionsImages = {
  query: 'data',
  gl: 'US',
  hl: 'en_US',
  device: 'desktop',
  duration: '1',
  autocorrect: 0,
  page: 1,
  uule: '1',
  pages: 1,
  size: 'any',
  license: 'any',
  color: 'any',
  type: 'any',
};

const searchApi = axios.create({
  baseURL: 'https://google-search-5.p.rapidapi.com/google',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'YOUR API KEY HERE',
    'X-RapidAPI-Host': 'google-search-5.p.rapidapi.com',
  },
});

export const defaultSearch = async (args) => {
  try {
    const { input, uri, page } = args;
    let newOptions;
    if (uri === '/organic-search') {
      newOptions = optionsDefault;
    } else if (uri === '/images') {
      newOptions = optionsImages;
    } else newOptions = optionsDefault;

    newOptions.query = input;
    newOptions.page = page;

    const response = await searchApi.post(uri, newOptions);

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
  }
};

export default searchApi;
