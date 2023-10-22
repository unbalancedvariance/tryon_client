
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
import './Home.css'; // Import your styles
import productsData from './products.json';
import Product from './Product'; // Import your Product component

function Home() {
  const [messages, setMessages] = useState([
    { message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "Just now", sender: "ChatGPT" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Function to generate a new set of products to display
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

  // Function to handle sending a message
  const handleSend = (messageContent) => {
    if (!messageContent.trim()) {
      // Prevent empty messages
      return;
    }

    const newUserMessage = {
      message: messageContent,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate ChatGPT response for demonstration
    setIsTyping(true);
    setTimeout(() => {
      const newProducts = generateNewProducts();
      const chatGPTResponse = {
        message: "Sure, here's a response!",
        sentTime: "Just now",
        sender: "ChatGPT",
        products: newProducts,  // Store products directly in the message
      };
      setMessages((prev) => [...prev, chatGPTResponse]);
      setIsTyping(false);
    }, 1000);
  };


    

  return (
    <div>
    {/* Navbar */}
    <div className="navbar">
      <a href="#home">Home</a>
      <a href="#Products">Products</a>
    </div>

    {/* Main content */}
    <div className="container">
      <div className="leftSide">
        <div className="imageContainer">
          <img src="https://m.media-amazon.com/images/G/31/img2020/fashion/WA_2020/Thedressedit/Pagegraphics/Brandsinfocus/TOP_BRANDS_31._SX564_QL85_FMpng_.png" alt="Description" />
          <p>Description of the image goes here...</p>
        </div>
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
                    {/* Render product info within the chat if the message is from ChatGPT */}
                    {message.sender === 'ChatGPT' && message.products && (
                      <div className="chatgpt-products-container">
                        <Product products={message.products} />
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


