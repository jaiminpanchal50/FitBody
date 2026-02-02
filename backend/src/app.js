const express = require('express');
const userModel = require('./model/user.model');
const app = express()

app.use(express.json())

// get users list
app.get('/api/users', async (req, res) => {

    const allUsers = await userModel.find()

    res.status(200).send({
        message: "Users List",
        allUsers
    })

})

// add users api
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await userModel.findOne({ email })

    if (existUser) {
        return res.status(409).send({
            message: "User Allready exist",
            existUser
        })
    }
    const newUser = await userModel.create({
        name, email, password
    })

    res.status(200).send({
        message: "User created successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }
    })
})

// update user api
app.patch('/api/user/:id', async (req, res) => {
    const id = req.params.id;

    const updatedUser = await userModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "User updated successfully",
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        }
    });
});

// delete user api
app.delete('/api/user/:id', async (req, res) => {
    const id = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "User deleted successfully",
        user: {
            id: deletedUser._id,
            name: deletedUser.name,
            email: deletedUser.email,
        }
    });
});




module.exports = app;