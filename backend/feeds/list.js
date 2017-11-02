'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  console.log(event);

  dynamoDb.scan({TableName : 'feeds'}, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch items.'));
      return;
    }

    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null, response);
  });
};
