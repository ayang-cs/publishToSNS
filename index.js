var orderIds = require('./orderIds.js')
var config = require('./config.js')
const env = process.argv[2]

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-west-2'});

const publishSNSTo = ({ TopicArn, Message }) => {
    // Create publish parameters
    var params = {
        Message, /* required */
        TopicArn
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
    function(data) {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });

}


const topic = 'casestack-events_order-confirmed'
const publishMultipleOrdersToOrderConfirmed = ({ orderIds }) => {
    const TopicArn = `arn:aws:sns:${config[env].AWS.REGION}:${config[env].AWS.ACCOUNT_ID}:${topic}`
    const results = orderIds.map((orderId) => {
        publishSNSTo({ Message: orderId.toString(), TopicArn })
    })
    return results
}

const publish = publishMultipleOrdersToOrderConfirmed({ orderIds })
console.log('Results', publish)