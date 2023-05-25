const getCSRFToken = () => {
  const csrfTag = document.querySelector('meta[name=csrf-token]');
  return csrfTag ? csrfTag.content : '';
};

export default getCSRFToken;
