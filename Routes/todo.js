const router = require('express').Router();
const Todo = require('../Modules/todo');


router.route('/')
    .get( async (req,res,next) => {
        try {
            let data = await Todo.find(req.query);
            res.json(data);
        } catch (error) {
            next(error);
        }
    })
    .post( async (req,res,next) => {
        try {
            let newData = new Todo(req.body);
            let savedTodo = await newData.save();
            res.json(savedTodo);
        } catch (error) {
            next(error);
        }
    })


router.route('/:id')
    .put( async (req,res,next) => {
        try {
            let updatedData = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.json(updatedData);
        } catch (error) {
            next(error);
        }
    })
    .delete( async (req,res,next) => {
        try {
            let deletedData = await Todo.findByIdAndRemove(req.params.id);
            res.json(deletedData);
        } catch (error) {
            next(error);
        }
    })


module.exports = router;