# Graffitiboard
A public imageboard website where users can upload their favorite berlin StreetArt, and comment about each others images.
![](public/imagegif.gif) 

~Features
Uploaded images are stored on Amazon S3 and then deleted from server,
Commenting mechanism
Client-Side hash-based routing
Vue.js on the client-side, with a main Vue and separate components for the individual image modal and commenting modal
Node.js running the Express framework for routing.
PostgreSQL for DB maintenance.
Uploading images via Multer
Storing images on Amazon S3 via Knox
Processing dates for images and comments from timestamp to readable formats via moment.
