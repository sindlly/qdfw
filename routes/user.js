/*二级路由*/
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var user=require('../models/user');
var member=require('../models/member');
//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/qdfw');
//监听数据库是否链接成功
mongoose.connection.on("connected",function(){
    console.log('mongoose connect success');
})
mongoose.connection.on("error",function(){
    console.log('mongoose connect error');
})
mongoose.connection.on("disconnected",function(){
    console.log('mongoose connect disconnected');
})
//获取所有人员信息
router.get("/users",function(req,res,next){
    query({}).then(function (result) {
        if(result.length==0){
            res.json({
                code:'500',
                msg:"查询失败"
            })
        }else{
            res.json({
                code:'0',
                msg:'查询成功',
                data:result
            })
        }
    })
})
//获取当前人员的姓名、id以及对应的PM
router.get("/user",function(req,res,next){
    queryUser({}).then(function (result) {
        if(result.length==0){
            res.json({
                code:'500',
                msg:"查询失败"
            })
        }else{
            res.json({
                code:'0',
                msg:'查询成功',
                data:result
            })
        }
    })
})
//登录
router.get("/login",function(req,res,next){
    var queryData = {name:req.query.name}
    query(queryData).then(function (result) {
        if(result.length==0){
            res.json({
                code:'500',
                msg:"登录失败"
            })
        }else{
            res.json({
                code:'0',
                msg:'登录成功',
                result:{
                    count:result.length,
                    list:result
                }
            })
        }
    });
})

//设置候选人信息 name id pm
router.get("/setUserInfo",function (req,res,next){
    var name = req.query.name
    var id = ""
    var pm = req.query.pm
    var queryData = {name:req.query.name}
    query(queryData).then(function (result) {
        if(result.length==0){
            res.json({
                code:'500',
                msg:"查询失败"
            })
        }else{
            id = result[0]._id
            console.log("id"+id)
            user.findById(7, function (err, doc) {
                if(err){
                    console.error("errxx："+err);
                    return
                }else {
                        doc.name=name;
                        doc.id=id
                        doc.pm=pm

                    //用save来将数据保存到数据库中
                    doc.save(function (err, doc1) {
                        if(err){
                            console.error("errrr=="+err);
                            res.json({
                                code:'0',
                                msg:'设置失败',
                            })
                        }else{
                            console.log(doc1);
                            res.json({
                                code:'0',
                                msg:'设置成功',
                            })
                        }
                    });
                }
            })
        }
    });
})

//投票
router.get("/vote",function(req,res,next){
    var id = req.query.id;
    var role = req.query.role
    var grade = req.query.grade
    var vote = {id:id,grade:{A:0,B:0,C:0}}
    //判断身份
    //role[1,2,3]=[平民，PM,TL]
    // console.log(vote.grade[grade])
    if(role == "1"){
        vote.grade[grade]=1
    }
    if(role == "2"){
        vote.grade[grade]=1.5
    }
    if(role == "3"){
        vote.grade[grade]=2
    }
    update(vote).then(function (result) {
        // console.log("vote:"+vote)
        if(result=="err"){
            res.json({
                code:'500',
                msg:"投票失败"
            })
        }else{
            res.json({
                code:'0',
                msg:'投票成功',
            })
        }
    });
})


//查询 member表
async function query(obj){
    var result = {}
    console.log("query:"+obj)
    await member.find(obj,function(err,doc){
        if(err) return {}
        else {
            result = doc
        }
    })
    console.log("queryResult:"+result)
    return result
}
//查询 user表
async function queryUser(obj){
    var result = {}
    console.log("query:"+obj)
    await user.find(obj,function(err,doc){
        if(err) return {}
        else {
            result = doc
        }
    })
    console.log("queryResult:"+result)
    return result
}

//更新
// obj 结构 {id:xxx,grade:{A:1,B:1.5,C:2}}
async function update(obj){
    let result = {}
    // /*await member.findById(obj.id, function (err, doc) {
    //     if(err){
    //         console.error("err："+err);
    //         result = "err"
    //         return
    //     }else {
    //         doc.grade = {
    //             A:doc.grade.A+obj.grade.A,
    //             B:doc.grade.B+obj.grade.B,
    //             C:doc.grade.C+obj.grade.C
    //         }
    //         //用save来将数据保存到数据库中
    //         doc.save(function (err, doc1) {
    //             if(err){
    //                 console.error("err2"+err);
    //                 result = "err"
    //             }else{
    //                 console.log("write:"+doc1);
    //                 result = "success"
    //             }
    //         });
    //     }
    // }).catch((error)=>{
    //     console.error("error:"+error);
    //     result = "err"
    // });*/
    let condition = {"_id":obj.id}
    let update ={$inc:{'grade.A':obj.grade.A/2,'grade.B':obj.grade.B/2,'grade.C':obj.grade.C/2}}
    // let update ={$inc:{'role':0.5}}
    await member.findOneAndUpdate(condition,update,function (err) {
        console.log("herr")
        if(err){
            console.error("err2"+err);
            result = "err"
        }else{
            console.error("success");
            result = "success"
        }
    })
    return result
}


module.exports=router;
