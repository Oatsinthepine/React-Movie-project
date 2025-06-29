import { Client, Databases, Query, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// set up the Appwrite client by initialising the Appwrite client with the project ID and endpoint
const client = new Client().setEndpoint('https://syd.cloud.appwrite.io/v1').setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID); This is just to check if the environment variables are set correctly
    // Use appwrite SDK to check if the search term already exists in the database
    // if it does, update the count
    // if not, create a new document with the search term and add the count by 1
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", searchTerm)
        ])
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            console.log("doc is: ", doc);
            // Update the count of the existing document
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {count: doc.count + 1})
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id
            })
        }
    } catch (error) {
        console.error("Error fetching search term:", error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ])
        return result.documents;
    } catch (error) {
        console.log(error)
    }
}