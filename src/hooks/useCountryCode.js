import React, {useEffect, useState} from 'react';

const useCountryCode = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/?key=2lVY8K8boFCOZVg0lmVY')
      .then(res => res.json())
      .then(response => {
        setData(response);
        // return response;
      })
      .catch((data, status) => {
        console.log('Request failed:', data);
      });
  }, []);

  return data;
};

export default useCountryCode;
