import axios from 'axios';

const API_KEY = '31319107-722dadb9eaa121b95e9a372a6';
// const API_KEY = '';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

async function fetchData(searchValue, page, PER_PAGE) {
  const response = await axios.get(
    `&q=${searchValue}&per_page=${PER_PAGE}&page=${page}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject();
  }
}

export default fetchData;
