"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');
// User routes
router.route('/')
    .get(getAllUsers)
    .post(createUser);
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
// Friend routes
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
// router.get('/', async(_req, res) => {
//     try{
//         const users = await User.find({});
//         res.status(200).json(users);
//     }catch(err){
//         console.log(err)
//         res.status(500).json(err)
//     }
// })
exports.default = router;
