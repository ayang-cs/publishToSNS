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

/**
 * List of order ids to be sent to casestack-events-_order-confirmed
 */

const orderIds = [
    11116341,
    11116667,
    11117669,
    11134981,
    11116859,
    11124261,
    11135499,
    11136756,
    11109557,
    11113516,
    11117377,
    11125541,
    11132943,
    11119072,
    11125309,
    11133716,
    11113796,
    11120626,
    11122415,
    11130124
]

const publishMultipleOrdersToOrderConfirmed = ({ orderIds }) => {
    const TopicArn = 'arn:aws:sns:us-west-2:410986195230:casestack-events_order-confirmed' //extrapolate account id and region later for prod
    const results = orderIds.map((orderId, index) => {
        
        publishSNSTo({ Message: orderId.toString(), TopicArn })
    })
    return results
}

const publish = publishMultipleOrdersToOrderConfirmed({ orderIds })
console.log('Results', publish)