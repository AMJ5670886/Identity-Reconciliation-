const { where } = require('sequelize');
const User = require('../models/user');

exports.create = (req, res, next) => {
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    let loadedPhNo;
    User.findAll({where:{phoneNumber: phoneNumber}})
        .then(user => {
            if(user.length === 0){
                return User.create({
                    phoneNumber: phoneNumber,
                    email: email
                })
            }else{
                let loadedUser = user[0];
                return User.findAll({where:{email:email}})
                    .then((usr)=>{
                        if(usr.length !== 0){
                            loadedPhNo = usr[0].phoneNumber;
                            console.log('loadedPhno',loadedPhNo)
                            loadedUser.linkedId = usr[0].id;
                            loadedUser.linkedPrecedence = 'secondary';
                            return loadedUser.save();
                        }else{
                            return User.create({
                                phoneNumber: phoneNumber,
                                email: email,
                                linkedId: loadedUser.id,
                                linkedPrecedence: 'secondary'
                            })
                        }
                    })
            }
        })
        .then((user)=>{
            if(user.linkedId === undefined){
                res.status(200).json({
                    message:'created!!',
                    contact:{
                        primaryContactId: user.id,
                        emails: [user.email],
                        phoneNumbers: [user.phoneNumber],
                        secondaryContactIds: [user.linkedId]
                    }
                })
            }else{
                return User.findAll({where:{phoneNumber:phoneNumber}})
                    .then(user => {
                        let emailArr=[],phoneNoArr=[],secConIdArr=[];
                        phoneNoArr.push(phoneNumber);
                        const promises = user.map(element => {
                            if(!emailArr.includes(element.email)){
                                emailArr.push(element.email)
                            }
                            if(element.linkedPrecedence === "secondary"){
                                secConIdArr.push(element.id)
                            }
                            if(element.linkedId !== undefined){
                                return User.findByPk(element.linkedId)
                                    .then((usr => {
                                        if(!emailArr.includes(usr.email)){
                                            emailArr.push(usr.email)
                                        }
                                        if(!phoneNoArr.includes(usr.phoneNumber)){
                                            phoneNoArr.push(usr.phoneNumber)
                                        }
                                    }))
                            }
                        })
                        return Promise.all(promises).then(()=>{
                            res.status(200).json({
                                contact:{
                                    primaryContactId: user[0].linkedId,
                                    emails: emailArr,
                                    phoneNumbers: phoneNoArr,
                                    secondaryContactIds: secConIdArr
                                }
                            })

                        })
                    })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    
}