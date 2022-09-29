import App from 'express'
import connectDB from './DBconnection/index.mjs'
// import configureExpressApp from './config'
import applyRoutes from './routes/index.js'
const app = new App()
// configureExpressApp(app)
const PORT = 3005

const startServer = () => {
    Promise.all([connectDB()]).then(()=>{
        app.listen(PORT)
        console.log(`Server started on port ${PORT}`)
        applyRoutes(app)
    })
}

startServer()