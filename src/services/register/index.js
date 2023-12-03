export const registerNewUser = async (FormData)=>{
    try{
        const response = await fetch('/api/register',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(FormData)
        })
        const finalData = await response.json()

        return finalData
    }catch(error){
        console.log(error)
    }
} 