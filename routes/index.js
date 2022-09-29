import { Controller } from '../app/controllers/index.js'
import { Validaiton} from '../utility/validations.js'
import express, { json } from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const applyRoutes = (app) => {
    app.use(cors())
    app.use(json())
    app.get('./', (req,res)=>res.send(`API is running fine`))

app.get('/user',Controller.getAllUsers )
app.post('/user', Validaiton.validateCreateUser,Controller.createUser)
app.post('/login', Validaiton.validateLogin,Controller.loginUser)
app.post('/channel', Validaiton.validateCreateChannel,Controller.createChannel)
app.get('/search-user', Validaiton.validateSearchUser,Controller.searchUser)
app.get('/channel-list', Validaiton.validateGetChannelList,Controller.getChannelList)
app.post('/message', Validaiton.validateAddMessage,Controller.sendMessage)
app.get('/*', express.static(path.join(__dirname, 'front-end/public/index.html')))
}
export default applyRoutes