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
const { User } = require('../models');
module.exports = {
    // Get all users
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find().populate('thoughts').populate('friends');
                res.json(users);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Get a single user by ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findById(req.params.id).populate('thoughts').populate('friends');
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Create a new user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.create(req.body);
                res.json(user);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    // Update user
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Delete user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByIdAndDelete(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ message: 'User deleted' });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Add friend
    addFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Remove friend
    removeFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
};
