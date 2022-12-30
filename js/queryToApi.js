const BASE_URI = 'http://127.0.0.1:8000'; // Uri para conexión con el servidor servidor
// const BASE_URI = 'http://127.0.0.1:5000/api/'; // Uri para conexión con el servidor servidor

// Método que realiza la consulta a la api para obtener los datos según el endpoint.
const queryToAPI = async (endPoint) => {
  const apiURL = `${BASE_URI}${endPoint}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    // console.log(data)
    return data;
  } 
  
  catch (error) {
    console.log('Fetch Error', error);
  };
};

export default queryToAPI;