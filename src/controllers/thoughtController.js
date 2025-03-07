"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Thought, Users } = require('../models');
module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thoughts = yield Thought.find();
                res.json(thoughts);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Get a single thought by ID
    getThoughtById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought.findById(req.params.id);
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Create a thought
    createThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought.create(req.body);
                yield User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
                res.json(thought);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    // Update a thought
    updateThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Delete a thought
    deleteThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought.findByIdAndDelete(req.params.id);
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json({ message: 'Thought deleted' });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Add a reaction to a thought
    addReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Remove a reaction from a thought
    removeReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
};
