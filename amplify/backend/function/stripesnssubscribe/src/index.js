const AWS = require('aws-sdk')
const sns = new AWS.SNS()

exports.handler = async (event) => {
	const { orderID, phoneNumber } = JSON.parse(event.body)
	const params = {
		Protocol: 'sms',
		TopicArn: 'arn:aws:sns:us-east-1:936471194299:StripeTopic',
		Endpoint: phoneNumber,
		Attributes: {
			FilterPolicy: JSON.stringify({ orderID: [orderID] }),
		},
	}
	await sns
		.subscribe(params)
		.promise()
		.catch((e) => console.log(e))
	const response = {
		statusCode: 200,
		//  Uncomment below to enable CORS requests
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		},
		body: JSON.stringify('Hello from Lambda!'),
	}
	return response
}
