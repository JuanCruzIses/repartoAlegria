import mongoose from "mongoose"

const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}

const connectToDB = async()=>{
    const connectionUrl = 'mongodb+srv://juancruzises:MatiMacheTunkiLeo@ecommerce.ymc2wbm.mongodb.net/'
    mongoose.connect(connectionUrl, configOptions)
    .then(()=>
        console.log('Database connected succesfully'))
        .catch((err)=>
            console.log(`Error in connection DB: ${err.message}`))
}

export default connectToDB