const AWS = require('aws-sdk')
const SNSClient = new AWS.SNS()

exports.handler = async (event) => {
	console.log(JSON.stringify(event), null, 2)
	let response

	try {
		const resp = await SNSClient.publish({
			Message: 'Your order is out for delivery',
			TargetArn:
				'arn:aws:sns:us-east-1:936471194299:StripeTopic:d0906213-791e-4884-b407-52e251ca2ee2',
			MessageAttributes: {
				orderID: {
					DataType: 'String.Array',
					StringValue: JSON.stringify(['some_order_number']),
				},
			},
		}).promise()
		console.log(resp)
		// 3. send response back to the frontend
		response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
			},
			body: JSON.stringify({
				status: 'done',
			}),
		}
	} catch (e) {
		console.log(e)
		// todo: update response for when things go bad 😢
	}
	return response
}
