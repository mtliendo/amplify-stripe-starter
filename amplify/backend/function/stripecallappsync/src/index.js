/* Amplify Params - DO NOT EDIT
	API_AMPLIFYSTRIPEAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYSTRIPEAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWSAppSyncClient = require('aws-appsync').default
const gql = require('graphql-tag').default
require('cross-fetch/polyfill')

const graphqlClient = new AWSAppSyncClient({
	url: process.env.API_AMPLIFYSTRIPEAPI_GRAPHQLAPIENDPOINTOUTPUT,
	region: process.env.REGION,
	auth: {
		type: 'AWS_IAM',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			sessionToken: process.env.AWS_SESSION_TOKEN,
		},
	},
	disableOffline: true,
})

const mutation = gql`
	mutation CreateOrder($input: CreateOrderInput!) {
		createOrder(input: $input) {
			owner
			customerDetails {
				name
				streetName
				city
				state
				zipCode
			}
			productPriceID
			orderStatus
		}
	}
`
exports.handler = async (event) => {
	console.log('this is the event', event)
	await graphqlClient.mutate({
		mutation,
		variables: {
			input: {
				owner: 'mtliendo@gmail.com',
				customerDetails: {
					name: 'Michael Liendo',
					streetName: '319 W 29 PL',
					city: 'davenport',
					state: 'IA',
					zipCode: '52803',
				},
				productPriceID: 'price_1Jln7wFVOljUQinzaNOXVn52',
				orderStatus: 'PROCESSING',
			},
		},
	})
}
