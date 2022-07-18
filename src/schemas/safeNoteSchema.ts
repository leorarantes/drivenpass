import joi, { string } from "joi";

const safeNoteSchema = joi.object({
    title: string().max(50),
    note: string().max(1000)
});

export default safeNoteSchema;