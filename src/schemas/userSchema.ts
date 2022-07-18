import joi from "joi";

const userSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(10)
});

export default userSchema;