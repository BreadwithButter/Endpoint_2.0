import fs, { writeSync } from "fs";
import { myFile_enc } from ".";
import { book_response, response_short } from "./types/JSON_resp";


/**
 * Update of JSON file
 */

export function update_file(){
    let updated_json: string = JSON.stringify(myFile_enc, null, '\t');

    fs.writeFile('books.json', updated_json, (err) => 
    {
        if (err)
            console.log(err);
        else
        {
            console.log(updated_json);
        }
    });
}


let myMap = new Map<String, any>();
export default myMap;

/**
* Function for updating Map from in book.JSON file
*/
export function update_Map(){
    
    myFile_enc.forEach((responses: book_response) => myMap.set(responses.id , responses))
}


/**
 * Generate a random ID from numbers
 */
export function makeid() {
    var text = "";
    var possible = "ABCDEFGHHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
    }
    
/**
 * 
 * @param author input author
 * @param name input name
 * @param book type of responses
 * @returns Book which fulfill a requirements
 */
export let searchBooks = function (author: string = "", name: string = "", book: book_response) {
        if (author) {
            for(let i = 0; i < book.author.length; i++){
                if (book.author[i].toLowerCase().includes(author.toLowerCase())){
                    return book
                }
            }
        }
        else if (name) {
            return book.name.toLowerCase().includes(name.toLowerCase()) ? book : false;
        } 
    }