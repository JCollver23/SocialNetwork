"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const localReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId()
    }
});
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    // createdAt: {
    //     type: Date,
    //     default: () => new Date(),
    //     get: (timestamp) => dateFormat(timestamp),
    // },
    username: {
        type: String,
        required: true
    },
    reactions: [localReactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});
// Virtual: Reaction Count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = (0, mongoose_2.model)('Thought', thoughtSchema);
exports.default = Thought;
