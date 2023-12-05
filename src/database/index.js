import mongoose from "mongoose"
const dbPass = process.env.DB_PASS
const dbName = 'ecommerce'
const urlDB = `mongodb+srv://juancruzises:${dbPass}@ecommerce.ymc2wbm.mongodb.net/${dbName}`
const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}

const connectToDB = async()=>{
    try{
        const connectionUrl = urlDB
        await mongoose.connect(connectionUrl, configOptions)
        console.log('Database connected succesfully')

    }catch(err){
        console.log(`Error in connection DB: ${err.message}`)
    }
}

export default connectToDB