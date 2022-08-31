const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// connection to mongoDb

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://muneebbinayub:muneeb123@cluster0.adtxleg.mongodb.net/user?retryWrites=true&w=majority');
}

mongoose.connection.once('open', function () {
    console.log('connected db successfully')
})

// schema

const mainUserSchema = new mongoose.Schema({
    name: String,
    balance: Number,
    monthly: Number,
    paid: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

const projectmain = mongoose.model('projectmain', mainUserSchema);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        warning: ''
    });
})

app.get('/member', (req, res) => {
    res.render('member.ejs', {
        warning: ''
    });
})

app.post('/member', (req, res) => {

    const name = req.body.name;
    const balance = req.body.balance;
    const monthly = req.body.monthly;
    projectmain.find
    const projectmainsave = new projectmain({
        name: name,
        balance: balance,
        monthly: monthly
    })
    projectmainsave.save((err, result) => {
        if (err)
            console.log(err);
        if (result)
            res.render('member.ejs', {
                warning: 'Submitted successfully'
            });
    })
})

app.get('/users', (req, res) => {
    projectmain.find({}, (err, result) => {
        if (err)
            console.log(err)
        if (result)
            res.render('users.ejs', {
                userData: result
            })
    })
})

app.get('/update',(req,res)=>{
    res.render('update.ejs',{warning:''});
})

app.post('/update', (req, res) => {
    const name = req.body.name;
    const balance = req.body.balance;
    projectmain.findOneAndUpdate({name:name}, {balance:balance},(err,data)=>{
        if(data)
            res.render('update.ejs',{warning:'Updated successfully'});
        else
            res.render('update.ejs',{warning:'User not found'});
        if(err)
            console.log(err);
        } );
})

app.listen(1000, (req, res) => {
    console.log('http://localhost:1000/');
})