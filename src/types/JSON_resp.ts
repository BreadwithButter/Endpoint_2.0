/**
 * Type responses for simple declaration of output data
 */

 export type book_response = {
    id: String,
    name: String,
    author: String[],
    genre: String[],
    publish_year: Number,
    publisher: String,
    publish_country: String,
    num_of_pages: Number
}

export type response_short = {
    id: String,
    name: String,
    author: String[],
    genre: String[],
}