import joi, { string } from "joi";

const credentialSchema = joi.object({
    title: string().required(),
    url: string().uri(),
    username: string().required(),
    password: string().required()
});

export default credentialSchema;