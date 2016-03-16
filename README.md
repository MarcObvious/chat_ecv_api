# chat_ecv_api
Simple NodeJS API framework that connects to twitter storing information, like tweets or trends by country, on a mongo database using mongojs.
That information can be recovered through API calls. 

### Live example
- `http://marcObvious.com:3000/api/play/`

### Getting it up and running
#### You will need mongodb running!

1. Clone this repo from `https://github.com/MarcObvious/chat_ecv_api.git`
2. Run `npm install`
3. Create config/settings.js from the template config/settings.dist.js as you like
3. Run `node server.js` in order to start the api
4. Run `node tasks\populateTwitter.js` in order to start populating your mongo database with 

## Originaly forked from 
-`https://github.com/krainet/KRNodeFramework`

[View contributors](https://github.com/MarcObvious/chat_ecv_api/graphs/contributors)