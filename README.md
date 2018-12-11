# Graffitiboard - Vue.js
A public imageboard website where users can upload their favorite berlin StreetArt, and comment on each others images.
![](public/imagegif.gif) 

~Features
Uploaded images are stored on Amazon S3 via Knox.
Vue.js on the client-side, with a main Vue and separate components for the individual image modal and commenting modal (hash based).
Node.js running the Express framework for routing.
PostgreSQL for DB maintenance,Uploading images via Multer
Processing dates from timestamp to readable format via moment.
