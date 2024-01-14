import { useState, useEffect } from 'react';

export const useDataResource = (url) => {
  const [ data, setData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const getAllData = () => {
    setIsLoading(true);
    fetch(url,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResult) {
        const formatted = jsonResult.map(el => 
          Object.fromEntries(Object.entries(el).map(([key, value]) => ([
            key.replace(/\s+/g, "")
              .replace(/_(\w)/g, (_, c) => c.toUpperCase()) // Convert underscore case to camelCase
              .replace(/^([A-Z])/, (match, c) => c.toLowerCase()), // Convert leading uppercase to lowercase
            value
          ])))
        ).filter(el => el.employeeID !== "''" && el.employeeID !== '');
        setData(formatted);
        setIsLoading(false);
      });
  }

  const getDataById = (id) => {
    setIsLoading(true);
    fetch(url,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResult) {
        const formatted = jsonResult.map(el => 
          Object.fromEntries(Object.entries(el).map(([key, value]) => ([
            key.replace(/\s+/g, "")
              .replace(/_(\w)/g, (_, c) => c.toUpperCase()) // Convert underscore case to camelCase
              .replace(/^([A-Z])/, (match, c) => c.toLowerCase()), // Convert leading uppercase to lowercase
            value
          ])))
        ).filter(el => el.employeeID === id);
        setData(formatted[0]);
        setIsLoading(false);
      });
  }

  useEffect(()=>{
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return {
    data,
    isLoading,
    getAllData,
    getDataById
  };
}