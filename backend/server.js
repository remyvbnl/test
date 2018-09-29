import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './models/Issue.js';
import { runInNewContext } from 'vm';
const port = "4000" // express server port;
const app = express();
// app.get('/', (req, res) => res.send('Hello Angular.js'));


const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MONGO CONNECTED`);
})


router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
        console.log(err);
        else 
        res.json(issues);
    } )
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
        console.log(err);
        else 
        res.json(issue);
    })
})

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('Failed to create new record')
        })
})


router.route('/issues/update/:id').post((req, res) => {
    issue.findById(req.params.id, (err, issue) => {
        if (!issue) 
            return next(new Error('Could not load'))
        else 
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Updated')
            }).catch(err => {
                res.status(400).send('Failed')
            })
    })
})

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else 
            res.json(`Deleted :)`)

    })
})



app.use('/', router);

app.listen(port, () => console.log(`Express Running at ${port}`))