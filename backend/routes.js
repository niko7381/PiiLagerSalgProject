const express = require('express');
const db = require("./db");
const Router = express.Router();

//Get all products from table products
Router.get("/api/products", (req, res, next) => {
    const sql = "select * from products"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "succes",
            "data": rows
        })
    });
});

//Get singel product from products
Router.get("/api/product/:id", (req, res, next) => {
    const sql = "select * from user where id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

// Create products
Router.post("/api/create/product", (req, res, next) => {
    var errors = []
    if (!req.body.navn) {
        errors.push("Intet navn");
    }
    if (!req.body.varenummer) {
        errors.push("Intet varenummer");
    }
    if (!req.body.placering) {
        errors.push("Intet placering");
    }
    if (!req.body.pris) {
        errors.push("Ingen pris");
    }
    if (!req.body.antal) {
        errors.push("Intet antal");
    }
    if (!req.body.status) {
        errors.push("Ingen status");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",")});
        return;
    }
    const data = {
        navn: req.body.navn,
        varenummer: req.body.varenummer,
        placering: req.body.placering,
        pris: req.body.pris,
        antal: req.body.antal,
        status: req.body.status
    }
    const sql = 'INSERT INTO products (navn, varenummer, placering, pris, antal, status) VALUES (?, ?, ?, ?, ?, ?)'
    const params = [
        data.navn, 
        data.varenummer, 
        data.placering, 
        data.pris, 
        data.antal, 
        data.status
    ]
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "sucess",
            "data": data,
            "id": this.lastID
        })
    });
})

Router.patch("/api/product/:id", (req, res, next) => {
    const data = {
        navn: req.body.navn,
        varenummer: req.body.varenummer,
        placering: req.body.placering,
        pris: req.body.pris,
        antal: req.body.antal,
        status: req.body.status
    }
    db.run(
        'UPDATE products set navn = COALESCE(?, navn), varenummer = COALESCE(?, varenummer), placering = COALESCE(?, placering), pris = COALESCE(?, pris), antal = COALESCE(?, antal), status = COALESCE(?, status) WHERE id = ?',
        [data.navn, data.varenummer, data.placering, data.pris, data.antal, data.status, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({"error": error.message});
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        }
    )
})

Router.delete("/api/product/:id", (req, res, next) => {
    db.run(
        'DELETE FROM products WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "Deleted Product", changes: this.changes})
        }
    )
})

module.exports = Router;