import mongoose from "mongoose";


const connect = (connectionStrng)=>{
    try {
        mongoose.connect(connectionStrng)
        .then(()=>{console.log('connected to database')})   
    } catch (error) {
        console.log(`error connecting to database ${error}`)
    }
}

export default connect