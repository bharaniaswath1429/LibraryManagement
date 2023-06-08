const dotenv = require('dotenv');
dotenv.config();
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base(process.env.AIRTABLE_BASE)
    .table(process.env.AIRTABLE_TABLE);


exports.handler = async (event, context, cd) => {
    const { id } = event.queryStringParameters;
    if (id) {
        try {
            let book = await airtable.retrieve(id);
            if (book.error) {
                return {
                    statusCode: 404,
                    body: `No product with id: ${id}`,
                };
            }
            book = { id: book.id, ...book.fields };
            return {
                statusCode: 200,
                body: JSON.stringify(book),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Server not found',
            }
        }
        
    }
    return {
        statusCode: 400,
        body: 'Provide book id'
    };
};