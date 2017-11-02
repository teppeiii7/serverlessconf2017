/**
 * message put sqs
 */
'use strict';
console.log('Loading function feeds_get_list.js');
const AWS = require('aws-sdk');
const LAMBDA = new AWS.Lambda({apiVersion: '2014-11-11'});
const crypto = require('crypto');

exports.handler = (event, context, callback) => {
    console.log('start.');

    var queueUrl = QUEUE_DOMAIN + QUEUE_NAME;

    // create authori_id.
    var reqId = '';
    if (event.context && event.context.requestId) {
        reqId = event.context.requestId;
    } else {
        reqId = context.awsRequestId;
    }

    var now = new Date();
    var nowJst = new Date(now.getTime() + 32400000); // 1000 * 60 * 60 * 9(hour)
    getAuthoriId(now).then(function(authoriId) {
        console.log('authoriId: ' + authoriId);

        // build message.
        var msg = {};
        msg.table = 'message';
        msg.companyId = event.args.companyId;
        msg.authoriId = authoriId;
        msg.requestTime = now.getTime(); // Backend-JavaでJSTにする
        msg.httpBody = event.httpBody;
        msg.httpHeader = event.httpHeader;
        msg.context = event.context;

        // return object when success.
        var rtn = {
            authoriId : authoriId
        };

        // enqueue the message.
        var params = {
            MessageBody: JSON.stringify(msg),
            QueueUrl: queueUrl
        };
        sqs.sendMessage(params, function(err, data) {
            if(err) {
                console.log('error: ','Fail Send Message' + err);
                context.fail('500: ' + err);  // ERROR with message
            } else {
                console.log('data: ', data.MessageId);
                context.succeed(rtn);  // SUCCESS
            }
        });

        // error log
        saveErrorLog(event, context, authoriId);
    });
};

function saveErrorLog(event, context, authoriId) {
    var args = {};
    args.companyId = event.args.companyId;
    args.errors = event.httpBody.errors;
    args.awsRequestId = context.awsRequestId;
    args.authoriId = authoriId;
    args.lambdaName = process.env.AWS_LAMBDA_FUNCTION_NAME;
    args.useragent = event.httpHeader["User-Agent"];

    if (args.errors && args.errors.length > 0) {
        var awParam = {
            FunctionName: "omtSaveErrorLog",
            InvokeArgs: JSON.stringify(args)
        };

        LAMBDA.invokeAsync(awParam, function(err, data) {
            if(err) {
                console.log(err + err.stack);
            } else {
                console.log(data);
            }
        });
    }
}

/**
 * authoriIdを取得します。
 * crypto.randomBytes()によって16進数8桁の文字列を返します.
 */
function getAuthoriId(now) {
    var nowStr = getLocalDateString(now);
    return new Promise(function (resolve, reject) {
        crypto.randomBytes(4, (err, buf) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(nowStr + '_' + buf.toString('hex'));
        });
    });
}

function getLocalDateString(d) {
    function pad(n){return n < 10 ? '0' + n : n}
    function padMs(n){return ('000' + n).slice(-3)}
    return d.getFullYear()
        + pad(d.getMonth() + 1)
        + pad(d.getDate())
        + pad(d.getHours())
        + pad(d.getMinutes())
        + pad(d.getSeconds())
        + padMs(d.getMilliseconds());
}
