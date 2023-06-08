const dotenv = require('dotenv');
dotenv.config();
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base(process.env.AIRTABLE_BASE)
    .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cd) => {
    try {
        const response = await airtable.list({ maxRecords: 200 });

        const books = response.records.map((book) => {
            const { id, fields } = book;
            console.log(fields);
            const {name,featured,price,company,description,category,shipping,images,publishdate} = fields
            const { url } = images[0]
            return {id,name,featured,price,company,description,category,shipping,images:url,publishdate}
            
            
        })
        return {
            statusCode: 200,
            body: JSON.stringify(books),
        };
    }
    catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: 'There was an error',
        };  
    }
    
};