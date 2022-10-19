const db = require('../models/db.js');
const Transaction = require('../models/TransactionModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            transactions currently stored in the database.
    */
    getIndex: function (req, res) {
        // your code here
        db.findMany(Transaction, {}, 'name refno amount', function (result) {
            console.log(result);
            res.render('index', { transactions: result });
        });
        // res.render('index'); // This is to load the page initially
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckRefNo`. This function checks if a
            specific reference number is stored in the database. If the number
            is stored in the database, it returns an object containing the
            reference number, otherwise, it returns an empty string.
    */
    getCheckRefNo: function (req, res) {
        // your code here
        var refNo = req.query.refno;
        db.findOne(Transaction, { refno: refNo }, 'refno', function (result) {
            console.log(result);
            res.send(result);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the transaction
            sent by the client to the database, then appends the new
            transaction to the list of transactions in `index.hbs`.
    */
    getAdd: function (req, res) {
        // your code here
        // var transaction = {
        //     name: req.body.name,
        //     refno: req.body.refNo,
        //     amount: req.body.amount
        // };

        console.log(req.query);
        db.insertOne(Transaction, req.query, function (result) {
            res.render('partials/card', req.query, function (err, html) {
                // console.log(html);
                res.send(html);
            });
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the transaction
            from the database, then removes the transaction from the list of
            transactions in `index.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        var refNo = req.query.refno;
        console.log(refNo);
        db.deleteOne(Transaction, { refno: refNo }, function (result) {
            res.send(result);
        });
    }

}

module.exports = controller;
