import fs, { writeSync } from "fs";
import { myFile_enc } from ".";


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