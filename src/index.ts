/**
 * Import of libraries; books.JSON - input file; response / reposnse_short - JSON input settings
*/
import cors from "cors";
import http from "http";
import express, { response } from "express";
import fs, { writeSync } from "fs";
import bodyParser, { json, urlencoded } from "body-parser";
import { book_response, response_short } from "./types/JSON_resp";
import myMap, { searchBooks, makeid, update_file, update_Map, } from "./methods";

/**
 *  Encoding of JSON file 
*/
let app;
const myFile = fs.readFileSync("books.json");
export let myFile_enc: book_response[] = JSON.parse(myFile.toString());





/**
 * Creating a htttp server, seting up .post(), .get(), .put() and .delete() settings
*/
function createServer() {
    
    /**
     * Basic setup
     */
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
     *  .post() declaration for getting info via id
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
     *  .post() declaration for searching book via name of book
     */
    app.post('/api/library/book/find/name',(req, res) =>
    {
        update_Map()
        const name = req.body["name"];
        const filter_of_books = myFile_enc.filter(book => searchBooks(undefined, name, book));
        res.json(filter_of_books);
    });


    /**
     *  .post() declaration for searching book via author's name
     */
    app.post('/api/library/book/find/author',(req, res) =>
    {
        const author = req.body["author"];
        const filter_of_books = myFile_enc.filter(book => searchBooks(author, undefined, book));
        res.json(filter_of_books);
    });


    /**
     *  .get() declaration for getting info via id
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
     *  .put() declaration with random generating id
    */
    app.put('/api/library/book/add',(req, res) => 
    {
        update_Map();
        while (true) {
            var id = makeid();
            if (myMap.has(id)){
                
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
                break;
            }
        
            
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