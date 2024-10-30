const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // replace with your frontend URL if different
  }));


const connectionString = 'Endpoint=https://newamdev.webpubsub.azure.com;AccessKey=Fe0rVI4Awv9w8COFEPjGdAQzyqjnEKo14EqKXKkSFB0dafwGRiQsJQQJ99AJACHrzpqXJ3w3AAAAAWPSOLXy;Version=1.0;';
const hubName = 'chat';
const service = new WebPubSubServiceClient(connectionString, hubName);

app.get('/negotiate', async (req, res) => {
  const token = await service.getClientAccessToken({
    roles: ["webpubsub.sendToGroup.chat", "webpubsub.joinLeaveGroup.chat"],
  });
  res.status(200).send(token.url);
});

app.listen(3002, () => console.log("Server running on http://localhost:3002"));
