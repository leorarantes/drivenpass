import joi, { boolean, string } from "joi";

const credentialSchema = joi.object({
    title: string().required(),
    username: string().required(),
    password: string().pattern(/[0-9]{6}/),
    isVirtual: boolean(),
    debitEnabled: boolean(),
    creditEnabled: boolean(),
});

export default credentialSchema;