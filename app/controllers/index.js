import UserModel from '../models/users.js'
import ChannelModel from '../models/channels.js'
import { sendError, sendResponse } from '../../utility/index.js'

 export const Controller = {
    getAllUsers : async (req,res) => {
        const users = await UserModel.find({})
        res.send(users)
    },
    createUser : async(req,res) =>{
        const requestData =req.body
        const isUserExist = await UserModel.findOneData({
            email: requestData.email
        })
        if(isUserExist) return sendResponse(res,isUserExist,'User fetched successfuly',true,200)
        const userObj = new UserModel(req.body)
        await userObj.saveData()
        sendResponse(res,userObj,'User added successfuly',true,200)
    },
    loginUser : async(req,res) =>{
        const requestData =req.body
        const isUserExist = await UserModel.findOneData({
            pemail: requestData.email,
            password: requestData.password,
        })
        
        if(!isUserExist) return sendError(res, {}, 'Invalid Credentials')
        sendResponse(res, isUserExist, 'User logged in successfuly', true, 200)
    },
    createChannel: async (req, res) => {
        const channelUsers = req.body.channelUsers;
        const firstUser = channelUsers[0];
        const secondUser = channelUsers[1];
        let isChannelAlreadyExist = false;
        let channelModel;
        console.log('çhannel',channelUsers)
    
        // const channelList = await ChannelModel.findData({
        //   "channelUsers.email": firstUser.email,
        // });
    
        // if (channelList && channelList.length) {
        //   channelList.forEach((channel) => {
        //     isChannelAlreadyExist = channel.channelUsers.find(
        //       (user) => user.email === secondUser.email
        //     );
        //     if (isChannelAlreadyExist)
        //       channelModel = channel
        //   });
        // }
    
        // if (isChannelAlreadyExist)
        //   return sendResponse(res, channelModel, "Channel created successfully", true, 200);
        channelModel = new ChannelModel({channelUsers});
        await channelModel.saveData();
        sendResponse(res, channelModel, "Channel created successfully", true, 200);
      },
    getChannelList: async(req,res) =>{
        const requestData = req.query
        const channel = await ChannelModel.findData({
            'channelUseres.email': requestData.email,
        }) 
        sendResponse(res, channel, 'Channel list fetched', true, 200)
    },
    searchUser : async(req,res) =>{
        const requestData = req.query
        const isUserExist = await UserModel.findOneData({
            email: requestData.email,
        })
        if(!isUserExist) return sendError(res, {}, 'No user found')
        sendResponse(res, isUserExist, 'User found successfuly', true, 200)
    },
    sendMessage : async(req,res) =>{
        const requestData = req.body
        console.log(requestData)
        await ChannelModel.findOneAndUpdateData({ _id: requestData.channelId },
            {$push: {messages: requestData.message}}
            )
            sendResponse(res, {}, 'Message sent successfuly', true, 200)
    },
}