export const url = () => {
  const country = 'us';
  const category = 'business';
  const apiKey = 'b73a895c1e2746a8a3ba2d5fdd57fd22';
  return `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
};
