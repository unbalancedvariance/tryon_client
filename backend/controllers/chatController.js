// in routes/POST-chat.js
const { Readable } = require("stream");
const { z } = require("zod");
const { BufferMemory } = require("langchain/memory");
const { ConsoleCallbackHandler } = require("langchain/callbacks");
const { OpenAI } = require("langchain/llms/openai");
// const  { OpenAI } = require('openai');
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { Pinecone } = require("@pinecone-database/pinecone");
// a parser for the specific kind of response we want from the LLM
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    answer: z
      .string()
      .describe("answer to the user's question, not including any product IDs, and only using product titles and descriptions"),
    productIds: z
      .array(z.string())
      .describe(
        "IDs from input product JSON objects for the user to purchase, formatted as an array, or omitted if no products are applicable"
      ),
  })
);

const prompt = new PromptTemplate({
  template: `You are a helpful shopping assistant trying to match customers with the right product. You will be given a question from a customer and then maybe some JSON objects with the id, title, and description of products available for sale that roughly match the customer's question. Reply to the question suggesting which products to buy. Only use the product titles and descriptions in your response, do not use the product IDs in your response. If you are unsure or if the question seems unrelated to shopping, say "Sorry, I don't know how to help with that", and include some suggestions for better questions to ask. {format_instructions}
  Products: {products}

  Question: {question}`,
  inputVariables: ["question", "products"],
  partialVariables: { format_instructions: parser.getFormatInstructions() },
});

const chatResponse  = async (req,res) => {
    const {usr_msg} = req.body;
    try{
      // Initialising the OpenAI Model and the lanchain object  

      const model = new OpenAI({
        temperature: 0,
        openAIApiKey: connections.openai.configuration.apiKey,
        configuration: {
          basePath: connections.openai.configuration.baseURL,
        },
        streaming: true,
      });
    
      const chain = new LLMChain({ llm: model, prompt, outputParser: parser });
    
      // const chain = new LLMChain({ llm: model, prompt});

      // Initialising pinecone and required index.
      const pinecone = new Pinecone();      
      // pull the pincone index
      const index = pinecone.Index("product-db");

      // embed the incoming message from the user
      let usr_embeddings = await model.embeddings.create({
        model: 'text-embedding-ada-002',
        input: ["SUGGEST SOME CLOTHES FOR DIWALI"],
      });

      usr_embeddings = usr_embeddings.data[0].embedding
      // get the 3 most closest results
      let  results = await index.query({
        vector: usr_embeddings,
        topK: 3,
        includeMetadata: true,
        includeValues: false
      });
      // code to send the products
      const products = results.matches.map(match => ({
        id: match.id,
        metadata: match.metadata
      }));

        // JSON-stringify the structured product data to pass to the LLM
      const productString = products
      .map((product) =>
        JSON.stringify({
          id: product.id,
          title: product.metadata.title,
          description: product.metadata.description,
        })
      )
      .join("\n");
    
    // // invoke the chain and add the streamed response tokens to the Readable stream
    // const resp = await chain.call({ 
    //   company: "a startup",
    //   product: "colorful socks",
    //  });

    //   // grab the complete response to store records in Chat Log model
    //   // const { answer, productIds } = resp.text;

    const resp = await chain.call({ question:"suggest diwali clothes", products: productString });



  }
  catch(error){
    console.log(error)
    res.status(400).json({error:error.message})
  }
}
module.exports = {
    chatResponse
}
