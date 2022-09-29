import mongoose from "mongoose"

const DB_CONNECTION_URL = `mongodb+srv://Venom_666:VeNoM666@cluster0.sjczf.mongodb.net/whatsapp?retryWrites=true&w=majority`

const connectDB = () => {
    console.log('DB trying to connect on' + new Date());
    const options = {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    return mongoose.connect(DB_CONNECTION_URL)
}

export default connectDB