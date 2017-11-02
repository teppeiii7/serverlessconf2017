'use strict';
console.log('Loading function...');

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  console.log('start...');
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  const feed_id = uuid.v1();
  const params = {
    TableName: 'feeds',
    Item: {
      feed_id: feed_id,
      created_at: timestamp,
      title: data.title,
      img_url: data.img_url,
      modified_at: timestamp,
    },
  };

  // write dynamodb
  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create item.'));
      return;
    }

    const rtn = {
      feed_id : feed_id
    };

    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify(rtn),
    };
    callback(null, response);
  });
};
