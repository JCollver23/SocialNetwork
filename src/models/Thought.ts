import { Schema, Document, ObjectId, Types } from 'mongoose';
import dateFormat from 'dateformat';
import { model } from 'mongoose';
import reactionSchema from './Reaction';


interface IReaction extends Document {
    reactionId: ObjectId,
    reaction: string,
    username: string,
    createdAt: Date
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Types.DocumentArray<IReaction>

}

const localReactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp, "mm/dd/yyyy")
    }
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [localReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);
// Virtual: Reaction Count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);


export default Thought;