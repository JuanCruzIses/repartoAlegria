import Cookies from "js-cookie";


export const addNewProduct = async(formData) =>{
    try{
        const response = await fetch('/api/admin/addProducts', {
            method: "POST",
            headers: {
                "content-type" : "application/json",
                Authorization:`Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })
        
        const data = await response.json();
        return data
        
    }catch(error){
        console.log('Error in login service: ' + error)
        throw error;
    }
}

export const getAllProducts = async () => {
    try {
      const response = await fetch('/api/admin/allProducts', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      throw error;
    }
  };
  

export const updateProduct = async(formData)=>{
  try{
    const response = await fetch('/api/admin/editProducts', {
      method: 'PUT',
      headers: {
        "content-type" : "application/json",
    },
    body: JSON.stringify(formData)
    })

    const data = await response.json()
    return data

  }catch(e){
    console.log(e) 
  }
}

export const deleteProduct = async(formData)=>{
  try{
    const response = await fetch('/api/admin/deleteProducts', {
      method: 'DELETE',
      headers: {
        "content-type" : "application/json",
        // Authorization:`Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify(formData)
    })

    const data = await response.json()
    return data

  }catch(e){
    console.log(e) 
  }
}