const cacheSettings = {
  staleTime: 3600000 * 23, // 12 hours in ms
  refetchOnWindowFocus: false,
};
const APIURL = import.meta.env.VITE_API_URL;
export { cacheSettings, APIURL };
