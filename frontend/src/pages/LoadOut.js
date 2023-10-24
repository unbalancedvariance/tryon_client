import React, { useState } from 'react';

function LoadOut({ images = [], onGenerateImage }) {
  const [selectedImages, setSelectedImages] = useState([]);

  // If there are no images, render a message or return null
  if (!images.length) {
    return <div>Add images to loadout </div>;
  }

  const toggleImageSelection = (img) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(prev => prev.filter(image => image !== img));
    } else {
      setSelectedImages(prev => [...prev, img]);
    }
  };

  // const handleGenerateImage = () => {
  //   // Logic for generating image from selected images
  //   console.log("Generating image using:", selectedImages);
  // };

  const handleGenerateImage = () => {
    // Logic for generating image from selected images
    console.log("Generating image using:", selectedImages);
    onGenerateImage();  // Call the callback function passed from the parent
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px', 
      left: '20px', 
      background: '#f5f5f5', 
      padding: '10px', 
      borderRadius: '5px',
      maxHeight: '400px', 
      overflowY: 'scroll',
      width: 'calc(50% - 40px)',
      border: '2px blue',
    }}>
      <h3>Load Out</h3>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: '10px',
        justifyContent: 'flex-start',
      }}>
       {images.map((img, index) => (
    <div 
        key={index} 
        style={{ 
            width: 'calc(33.33% - 12px)', // Adjusted width
            textAlign: 'center',
            border: '2px solid', // Always have a 2px border
            borderColor: selectedImages.includes(img) ? 'green' : 'transparent' // Use transparent for not-selected state
        }}
          >
            <img 
              src={img} 
              alt="Load Out Image" 
              style={{ width: '100%', height: 'auto' }}
              onClick={() => toggleImageSelection(img)} // Select image on click
            />
            <button 
              onClick={() => toggleImageSelection(img)}
              style={{
                marginTop: '5px',
                backgroundColor: selectedImages.includes(img) ? '#555' : 'green', // Change color if selected
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Virtual Try On
            </button>
          </div>
        ))}
      </div>
      <button 
        onClick={handleGenerateImage}
        style={{
          marginTop: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '8px 15px',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'block',
          margin: 'auto'
        }}
      >
        Generate Image
      </button>
    </div>
  );
}

export default LoadOut;



// import React, { useState } from 'react';

// function LoadOut({ images = [] }) {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [generatedImage, setGeneratedImage] = useState(null);

//   // If there are no images, render a message or return null
//   if (!images.length) {
//     return <div>Add images to loadout </div>;
//   }

//   const toggleImageSelection = (img) => {
//     if (selectedImages.includes(img)) {
//       setSelectedImages(prev => prev.filter(image => image !== img));
//     } else {
//       setSelectedImages(prev => [...prev, img]);
//     }
//   };

//   const handleGenerateImage = async () => {
//     try {
//       // Replace with your API endpoint and method
//       const response = await fetch('YOUR_API_ENDPOINT', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ selectedImages }) // Send selected images to the server
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate image');
//       }

//       const data = await response.json();

//       // Assuming the API response contains an "imageUrl" property with the generated image URL
//       setGeneratedImage(data.imageUrl);
//     } catch (error) {
//       console.error('Error generating image:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Display generated image on top left if available */}
//       {generatedImage && (
//         <img 
//           src={generatedImage} 
//           alt="Generated Image" 
//           style={{ position: 'absolute', top: '10px', left: '10px', maxWidth: '150px', height: 'auto' }}
//         />
//       )}

//       {/* Your existing Load Out component */}
//       <div style={{
//         position: 'fixed',
//         bottom: '20px', 
//         left: '20px', 
//         background: '#f5f5f5', 
//         padding: '10px', 
//         borderRadius: '5px',
//         maxHeight: '400px', 
//         overflowY: 'scroll',
//         width: 'calc(50% - 40px)',
//       }}>
//         <h3>Load Out</h3>
//         <div style={{ 
//         display: 'flex', 
//         flexDirection: 'row', 
//         flexWrap: 'wrap', 
//         gap: '10px',
//         justifyContent: 'flex-start',
//       }}>
//         {images.map((img, index) => (
//           <div 
//             key={index} 
//             style={{ 
//               width: 'calc(33.33% - 10px)', 
//               textAlign: 'center',
//               border: selectedImages.includes(img) ? '2px solid green' : 'none' // Highlight if selected
//             }}
//           >
//             <img 
//               src={img} 
//               alt="Load Out Image" 
//               style={{ width: '100%', height: 'auto' }}
//               onClick={() => toggleImageSelection(img)} // Select image on click
//             />
//             <button 
//               onClick={() => toggleImageSelection(img)}
//               style={{
//                 marginTop: '5px',
//                 backgroundColor: selectedImages.includes(img) ? '#555' : 'green', // Change color if selected
//                 color: 'white',
//                 padding: '5px 10px',
//                 border: 'none',
//                 borderRadius: '3px',
//                 cursor: 'pointer'
//               }}
//             >
//               Virtual Try On
//             </button>
//           </div>
//         ))}
//       </div>
//       <button 
//         onClick={handleGenerateImage}
//         style={{
//           marginTop: '10px',
//           backgroundColor: '#007BFF',
//           color: 'white',
//           padding: '8px 15px',
//           border: 'none',
//           borderRadius: '3px',
//           cursor: 'pointer',
//           display: 'block',
//           margin: 'auto'
//         }}
//       >
//         Generate Image
//       </button>
//       </div>
//     </div>
//   );
// }

// export default LoadOut;
