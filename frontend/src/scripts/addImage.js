// Define the image path (replace with the actual path to your uploaded image)
const imagePath = '/uploads/image.jpg';

// Create an image element
const imageElement = document.createElement('img');

// Set the source of the image element
imageElement.src = imagePath;

// Optionally, add styles or attributes to the image element
imageElement.alt = 'Uploaded Image';
imageElement.style.width = '300px';
imageElement.style.height = 'auto';

// Append the image element to the body of the document
document.body.appendChild(imageElement);