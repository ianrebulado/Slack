export async function fetchData (url, options = {}){
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export async function fetchUserReg (){
  try {
    
  }
  }