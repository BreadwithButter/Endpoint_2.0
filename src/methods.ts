import fs, { writeSync } from "fs";
import { myFile_enc } from ".";
import { response, response_short } from "./types/JSON_resp";

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

/**
* Function for updating Map from in book.JSON file
*/
let myMap = new Map<String, any>();
export default myMap;

export function update_Map(){
    
    myFile_enc.forEach((responses: response) => myMap.set(responses.id , responses))
}