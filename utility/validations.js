import { sendError } from "./index.js"
import yup from 'yup'

export const Validaiton = {
    validateCreateUser : async(req,res,next) => {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            profilePic: yup.string(),
          });
        await validate(schema, req.body, res, next)
    },
    validateLogin : async (req, res, next) => {
        const schema = yup.object().shape({
            email: yup.string().required(),
        })
        await validate(schema, req.body, res, next)
    },
    validateGetChannelList : async (req, res, next) => {
        const schema = yup.object().shape({
            email: yup.string().required()
        })
        await validate(schema, req.query, res, next)
    },
    validateSearchUser : async (req, res, next) => {
        const schema = yup.object().shape({
            email: yup.string().required(),
        })
        await validate(schema, req.query, res, next)
    },
    validateCreateChannel : async (req, res, next) => {
        const schema = yup.object().shape({
            channelUsers: yup.array().of(

                yup.string()
            )
            .required(),
        })
        await validate(schema, req.body, res, next)
    },
    validateAddMessage : async (req, res, next) => {
        const schema = yup.object().shape({
            channelId: yup.string().required(),
            message: yup.object().shape({
                senderEmail: yup.string().required(),
                text: yup.string().required(),
            }),
        })
        console.log(req.body, '**************************')
        await validate(schema, req.body, res, next)
    },
}

const validate = async (schema, reqData, res, next) => {
    try {
        await schema.validate(reqData, { abortEarly: false})
        next()
    } catch (e) {
        console.log(e)
        const errors = e.inner.map(({ path,  message, value}) => ({
            path,
            message,
            value,
        }))
        sendError(res, errors, 'Invalid Request')
    }
}