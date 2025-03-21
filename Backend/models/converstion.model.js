import {Schema,model} from 'mongoose';
import {User} from './userSchema.js';
import {Message} from './message.model.js';

const converstionSchema=new Schema({
    members:[
        {
            type:Schema.Types.ObjectId,
            ref:User
        }
    ],
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:Message,
            default:[],
        }
    ],
});

export const Converstion=model("Converstion",converstionSchema);