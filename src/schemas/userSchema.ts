import joi, { string } from "joi";

const userSchema = joi.object({
    email: string().email(),
    password: string().min(10)
});

export default userSchema;