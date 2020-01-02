let express = require('express')
let bodyParser = require('body-parser')

let app = express();
app.use(bodyParser.urlencoded({ extended: true }))

let arr=[
    {
        uname:'小鱼',
        pwd:1,
    },
    {
        uname:'iwen',
        pwd:2,
    },
    {
        uname:'kevin',
        pwd:3,
    },
]

// 登录接口
app.post('/login',function(req,res){
    let uname = req.body.uname;
    let pwd = req.body.pwd;

    let flag = true;
    for(let i =0; i<arr.length;i++){
        if(arr[i].uname == uname){
            flag = false;
            if(arr[i].pwd == pwd){
                res.send({
                    code:1,
                    msg:'登录成功',
                    user:arr[i]
                })
            }else{
                res.send({
                    code:2,
                    msg:'用户名或密码错误'
                })
            }
        }
    }

    if(flag){
        res.send({
            code:3,
            msg:'用户名不存在，请注册'
        })
    }
})


app.listen(3000,function(){
    console.log('运行在3000端口')
})
