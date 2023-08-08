var express = require("express")
var ejs = require("ejs")
var path = require("path")
var cors = require('cors')
const connection = require('./config/database');
const Scorecard = connection.models.Scorecard;
const Task = connection.models.Task;

var app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.render("index.ejs")
})

app.get('/Scorecard',(req,res,next)=>{
    console.log("fetch scorecard")
    res.send({habits:["wake up","clean my face","scroll phone","touch my toes"],evaluation:["positive","positive","negative","neutral"]})
})

app.post('/Scorecard',(req,res,next)=>{
    console.log(req.body)

    const postBody=req.body
    var Scorecard_Habits=[]
    for(element in postBody){
        console.log(element)
        Scorecard_Habits.push(postBody[element])
    }
    var Scorecard_Rate=[]
    for(i in Scorecard_Habits){
        Scorecard_Rate.push("+")
    }
    console.log(Scorecard_Habits)
    console.log(Scorecard_Rate)

    var ScorecardInsert = new Scorecard({
        User_id:"i'm bastian",
        Scorecard_Habits:Scorecard_Habits,
        Scorecard_Rate:Scorecard_Rate
    })

    ScorecardInsert.save().then(
        (item)=>{
            console.log(item)
        })
 })


app.post('/',(req,res,next)=>{
    console.log(req.body) 
})

app.get('/Goalmap', async (req,res,next)=>{
    const task =await Task.find({})
    console.log(task)
    res.send(task)
})

app.post('/Goalmap', async (req,res,next)=>{
    var TaskInsert = new Task({
        User_id:"123546789",
        description:"dos the dishes",
        GoalColor:"blueGoal",
        title:"House shore"})

        TaskInsert.save().then(
        (item)=>{
            console.log(item)
        })
})
app.listen(3000)

