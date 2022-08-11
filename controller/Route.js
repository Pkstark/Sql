const express = require('express');
const route = express.Router();
const User = require('../schema/modal');
const multer = require('multer');
const { application } = require('express');

User.sync();

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'uploads')
    },
    filename : (req,file,callback) => {
        callback(null,file.originalname);
    }

})

const upload = multer({storage : storage});

route.post('/register', upload.single('photo'),async (req,res) => {
    try {
        const email = req.body.email;
       
        const result = await User.findOne({where :{email : email}})

        if (result){
            res.json({
                status : 0,
                message : "Email already used this ... try another "
            })
        }else{
            const name = req.body.name;
            const password = req.body.password;
            const photo = req.file.path;
            const admin = req.body.admin;
            const agree = req.body.agree;

            const insert = {
                name,
                email,
                password,
                photo,
                admin,
                agree
            }

            const Register = new User (insert);

            Register.save().then((data) => {
                res.json({
                    status : 1,
                    message : "Registered successfully!!!",
                    data
                })
            }).then((err) => {
                console.log(err)
            })
        }
    } catch (error) {
        res.json({
            status : 0,
            message : "server error"
        })
    }

})


route.post('/login', async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({where : {email : email}})

    if (user.password == password){
        res.json({
            status : 1,
            message : "Login successfull",
            user
        })
    }else{
        res.json({
            status : 0,
            message : "DO NOT LOGIN"
        })
    }
})

route.post('/clientdata',async (req,res) => {

    await User.findAll().then((data) => {
        res.json({
            status : 1,
            message : "success",
            data
        })
    }).catch((err) => {
        res.json({
            status : 0,
            message : "Wrong"
        })
    })
})

route.post("/persondata",async (req,res) => {
    const email = req.body.email;
    await User.findOne({where : {email : email}},{username : 1}).then((data) => {
        res.json({
            status : 1,
            message : "success",
            data
        })
    })
})

route.post('/deleteclient/:id', async (req,res) => {
    const id = req.params.id
    await User.destroy({where : {id : id}}).then((data) => {
        res.json({
            status : 1,
            message : "Success"
        })
    }).catch((err) => {
        console.log(err)
    })
})

route.post('/clientupdate/:id',upload.single('photo'), async (req,res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const photo = req.file.path;

    const Updateuser = {
        name,
        password,
        email,
        photo
    }

    const id = req.params.id

    await User.update(Updateuser,{where : {id : id}}).then((data) => {
        res.json({
            staatus : 1,
            message : "Updated successfully"
        })
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = route;