import joi from "joi";

const credentialSchema = joi.object({
    title: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().pattern(/[0-9]{4}/),
    isVirtual: joi.boolean(),
    debitEnabled: joi.boolean(),
    creditEnabled: joi.boolean(),
});

export default credentialSchema;