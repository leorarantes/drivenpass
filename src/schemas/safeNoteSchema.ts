import joi from "joi";

const safeNoteSchema = joi.object({
    title: joi.string().max(50),
    note: joi.string().max(1000)
});

export default safeNoteSchema;