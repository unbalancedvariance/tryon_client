// in routes/POST-chat.js
const { Readable } = require("stream");
const { z } = require("zod");
const { BufferMemory } = require("langchain/memory");
const { ConsoleCallbackHandler } = require("langchain/callbacks");
const { OpenAIChat  } = require("langchain/llms");
const  { OpenAI } = require('openai');
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { Pinecone } = require("@pinecone-database/pinecone");

// // a parser for the specific kind of response we want from the LLM
// const parser = StructuredOutputParser.fromZodSchema(
//   z.object({
//     answer: z
//       .string()
//       .describe("answer to the user's question, not including any product IDs, and only using product titles and descriptions"),
//     productIds: z
//       .array(z.string())
//       .describe(
//         "IDs from input product JSON objects for the user to purchase, formatted as an array, or just give an empty array if no products are applicable"
//       ),
//   })
// );


const chatResponse  = async (req,res) => {
    const {usr_msg} = req.body;
    try{
      // Initialising the OpenAI Model and the lanchain object  

      const memory = new BufferMemory({ memoryKey: "chat_history" });

      //Instantiante the OpenAI model 
      //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
      const model = new OpenAIChat({ temperature: 0.1 });
    
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


  
    //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input 
    //Note the input variables {chat_history} and {input}
    const template = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. The AI answers as Yoda.
    Current conversation:
    {chat_history}
    Human: {input}
    AI:`;
  
    //Instantiate "PromptTemplate" passing the prompt template string initialized above
    const prompt = PromptTemplate.fromTemplate(template);
  
    //Instantiate LLMChain, which consists of a PromptTemplate, an LLM and memory. 
    const chain = new LLMChain({ llm: model, prompt, memory });
  
    //Run the chain passing a value for the {input} variable. The result will be stored in {chat_history}
    const res1 = await chain.call({ input: "Hi! I'm Morpheus." });
    console.log({ res1 });
  
    //Run the chain again passing a value for the {input} variable. This time, the response from the last run ie. the  value in {chat_history} will alo be passed as part of the prompt
    const res2 = await chain.call({ input: "What's my name?" });
    console.log({ res2 });
  
    //BONUS!!
    const res3 = await chain.call({ input: "Which epic movie was I in and who was my protege?" });
    console.log({ res3 });
    res.status(200).json({res3})
  }
  catch(error){
    console.log(error)
    res.status(400).json({error:error.message})
  }

}
module.exports = {
    chatResponse
}
