/**
 * Import of libraries; books.JSON - input file; response / reposnse_short - JSON input settings
*/
import cors from "cors";
import http from "http";
import express from "express";
import fs, { writeSync } from "fs";
import bodyParser, { json, urlencoded } from "body-parser";
import { response, response_short } from "./types/JSON_resp";
import myMap, { update_file, update_Map, } from "./methods";

/**
 *  Encoding of JSON file 
*/
let app;
const myFile = fs.readFileSync("books.json");
export let myFile_enc: response[] = JSON.parse(myFile.toString());





/**
 * Creating a htttp server, seting up .post(), .get(), .put() and .delete() settings
*/
function createServer() {
    
    app = express();
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false}));

    http.createServer(app).listen(3000, () =>{
        console.log('Server ON, port :3000');
    })
    update_Map();
    console.log(myMap)
    /**
     *  .post() declaration
     */
    app.post('/api/library/book/:id/info',(req, res) =>
    {
        update_Map()
        const id = req.params['id'];
        if (myMap.has(id))
        {
            res.json(myMap.get(id));
        }
        else 
        {
            res.json({id: 'Kniha s daným ID nebola nájdená'});
        }
    });


    /**
     *  .get() declaration
    */
    app.get('/api/library/book/:id/info',(req, res) => 
    {
        update_Map();
        const id = req.params['id'];
        if (myMap.has(id))
        {
            let lookfor_id = myMap.get(id);
            let write_book_short: response_short = 
            {
                id: lookfor_id.name,
                name: lookfor_id.name,
                author: lookfor_id.author,
                genre: lookfor_id.genre,
            }
            res.json(write_book_short);
        }
        else 
        {
            res.json({id: 'Kniha s daným ID nebola nájdená'});
        }
    });


    /**
     *  .put() declaration
    */
    app.put('/api/library/book/:id/add',(req, res) => 
    {
        update_Map();
        const id = req.params['id'];
        if (myMap.has(id))
        {
            res.json({id: 'Kniha s daným ID bola nájdená'});
        }
        else 
        {
            myFile_enc.push(
                {
                id: id,
                name: req.body['name'],
                author: req.body['author'],
                genre: req.body['genre'],
                publish_year: req.body['publish_year'],
                publisher: req.body['publisher'],
                publish_country: req.body['publish_country'],
                num_of_pages: req.body['num_of_pages'],
                }
            );
            
            update_file();
            res.json('Knižnica bola aktualizovaná');
        }
    });


    /**
     *  .delete() declaration
    */
    app.delete('/api/library/book/:id/delete', (req,res) =>
    {
        update_Map();
        const id = req.params['id'];
        if (myMap.has(id))
        {
            myFile_enc = myFile_enc.filter(myFile_enc => myFile_enc.id !== id);
            update_file();
            res.json('Knižnica bola aktualizovaná');
        }
        else
        {
            res.json('Kniha nebola najdená');
        }
    });

}

createServer()