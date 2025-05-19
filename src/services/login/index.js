export const login = async(formData) =>{
    try{
        const response = await fetch('https://repartoalegria-backend.onrender.com/api/users/login', {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = response.json();
        return data
        
    }catch(error){
        console.log('Error in login service: ' + error)
    }
}