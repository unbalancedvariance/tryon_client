// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from '@chatscope/chat-ui-kit-react';
// import './Home.css';
// import productsData from './products.json';
// import Product from './Product';
// import LoadOut from './LoadOut';
// import GeneratedImage from './GeneratedImage';

// function Home() {
//   const [messages, setMessages] = useState([
//     { message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "Just now", sender: "ChatGPT" },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [loadoutImages, setLoadoutImages] = useState([]);
//   const [generatedImageUrl, setGeneratedImageUrl] = useState(null);

//   const handleAddToLoadOut = imageUrl => {
//     setLoadoutImages(prev => [...prev, imageUrl]);
//   };


  

//   const generateNewProducts = () => {
//     const newProducts = [];
//     while (newProducts.length < 3) {
//       const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
//       if (!newProducts.includes(randomProduct)) {
//         newProducts.push(randomProduct);
//       }
//     }
//     return newProducts;
//   };

//   const handleSend = (messageContent) => {
//     if (!messageContent.trim()) {
//       return;
//     }

//     const newUserMessage = {
//       message: messageContent,
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "user",
//     };
//     setMessages((prev) => [...prev, newUserMessage]);

//     setIsTyping(true);
//     setTimeout(() => {
//       const newProducts = generateNewProducts();
//       const chatGPTResponse = {
//         message: "Sure, here's a response!",
//         sentTime: "Just now",
//         sender: "ChatGPT",
//         products: newProducts,
//       };
//       setMessages((prev) => [...prev, chatGPTResponse]);
//       setIsTyping(false);
//     }, 1000);
//   };
  

//   return (
//     <div>
//       <GeneratedImage imageUrl={generatedImageUrl} />
//       {/* Navbar */}
//       <div className="navbar">
//         <a href="#Home">Home</a>
//         <a href="#Products">Products</a>
//       </div>

//       {/* Main content */}
//       <div className="container">
//         <div className="leftSide">
          

//           {/* LoadOut Component positioned here */}
//           <LoadOut images={loadoutImages} />
          
//         </div>
//         <div className="rightSide">
//           <MainContainer>
//             <ChatContainer>
//               <MessageList
//                 scrollBehavior="smooth"
//                 typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
//               >
//                 {messages.map((message, index) => (
//                   <React.Fragment key={index}>
//                     <Message
//                       model={{
//                         message: message.message,
//                         sentTime: message.sentTime,
//                         direction: message.sender === 'user' ? 'outgoing' : 'incoming',
//                       }}
//                     />
//                     {message.sender === 'ChatGPT' && message.products && (
//                       <div className="chatgpt-products-container">
//                         <Product products={message.products} onAddToLoadout={image => {
//                           setLoadoutImages(prevImages => [...prevImages, image]);
//                         }} />
//                       </div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </MessageList>
//               <MessageInput placeholder="Type message here" onSend={handleSend} />
//             </ChatContainer>
//           </MainContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import './Home.css';
import productsData from './products.json';
import Product from './Product';
import LoadOut from './LoadOut';
import GeneratedLoadOut from './GeneratedLoadOut';


function Home() {
  const [messages, setMessages] = useState([
    { message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "Just now", sender: "ChatGPT" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadoutImages, setLoadoutImages] = useState([]);

  const [generatedImageUrl, setGeneratedImageUrl] = useState([]);


  const [showImage, setShowImage] = useState(false);




  const handleAddToLoadOut = imageUrl => {
    setLoadoutImages(prev => [...prev, imageUrl]);
  };

  const handleImageGeneration = () => {
    // Example of generating images
    const generatedImages = [
      "https://m.media-amazon.com/images/I/71pz6OtSOoL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71Jbu6h8DxL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71qs3hHvSEL._SX679_.jpg"
    ];
    setGeneratedImageUrl(generatedImages);
};



  const generateNewProducts = () => {
    const newProducts = [];
    while (newProducts.length < 3) {
      const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
      if (!newProducts.includes(randomProduct)) {
        newProducts.push(randomProduct);
      }
    }
    return newProducts;
  };

  const handleSend = (messageContent) => {
    if (!messageContent.trim()) {
      return;
    }

    const newUserMessage = {
      message: messageContent,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const newProducts = generateNewProducts();
      const chatGPTResponse = {
        message: "Sure, here's a response!",
        sentTime: "Just now",
        sender: "ChatGPT",
        products: newProducts,
      };
      setMessages((prev) => [...prev, chatGPTResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <a href="#Home">Home</a>
        <a href="#Products">Products</a>
      </div>
      
      {/* Main content */}
      <div className="container">
  
       
  
      <div className="leftSide">
    <GeneratedLoadOut images={generatedImageUrl} />
    <LoadOut images={loadoutImages} onGenerateImage={handleImageGeneration} />
</div>

      
        <div className="rightSide">
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
              >
                {messages.map((message, index) => (
                  <React.Fragment key={index}>
                    <Message
                      model={{
                        message: message.message,
                        sentTime: message.sentTime,
                        direction: message.sender === 'user' ? 'outgoing' : 'incoming',
                      }}
                    />
                    {message.sender === 'ChatGPT' && message.products && (
                      <div className="chatgpt-products-container">
                        <Product products={message.products} onAddToLoadout={image => {
                          setLoadoutImages(prevImages => [...prevImages, image]);
                        }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
