# Image Repository Project for Shopify

This is a project I built as a challenge submission for Shopify's Backend Developer Intern position. It's an image repository with:

 - secure uploading and stored images using MongoDB
 - searching for an image based on image name and description
 - drag and drop file upload
 - dynamic image gallery resizing
 - lightbox implementation for image gallery

## Stack

- **Frontend**
       React
       HTML/CSS
- **Backend**
       Node/Express
- **Database**
       MongoDB
- **Testing**  
       Mocha
       Chai
- **Important dependencies/libraries**  
       mongoose (for schemas and models)
       multer (middleware for storing image uploads)
    

## Installation/Run
```
git clone https://github.com/KevinGe00/shopify-backend-intern-challenge.git
```
In root directory (nodejs server):
Backend Installation/Usage
```
npm install
npm start
```
Frontend Installation/usage
```
cd client
npm install
npm start
```
## Testing
Integration tests with my image CRUD api is done in a separate node environment and uses a test specific database.

To start test, run this in the root directory:
```
npm test
```
