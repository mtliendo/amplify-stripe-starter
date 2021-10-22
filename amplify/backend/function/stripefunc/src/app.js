/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	AUTH_AMPLIFYSTRIPESTARTER9420C337_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const Stripe = require('stripe')
const app = express()
const aws = require('aws-sdk')

const fetchStripeSecret = async (key) => {
	const { Parameters } = await new aws.SSM()
		.getParameters({
			Names: [key].map((secretName) => process.env[secretName]),
			WithDecryption: true,
		})
		.promise()

	return Parameters[0].Value
}
const jsonParser = bodyParser.json()
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', '*')
	next()
})

/**********************
 * get method *
 **********************/

app.get('/stripe/products', jsonParser, async function (req, res) {
	// Add your code here
	const stripeSecretKey = await fetchStripeSecret('STRIPE_SECRET_KEY')
	const stripe = new Stripe(stripeSecretKey)

	const productPriceData = await stripe.prices.list({
		expand: ['data.product'], // 🎉 Give me the product data too!
	})

	const productData = productPriceData.data.map(
		({ product, unit_amount, id }) => ({
			name: product.name,
			description: product.description,
			price: unit_amount / 100,
			image: product.images[0],
			priceID: id,
		})
	)

	res.json(productData)
})

app.get(
	'/stripe/checkout-session/:customerSessionID',
	jsonParser,
	async (req, res) => {
		const stripeSecretKey = await fetchStripeSecret('STRIPE_SECRET_KEY')
		const stripe = new Stripe(stripeSecretKey)
		const id = req.params.customerSessionID

		try {
			if (!id.startsWith('cs_')) {
				throw Error('Incorrect CheckoutSession ID.')
			}
			const checkout_session = await stripe.checkout.sessions.retrieve(id)
			res.json(checkout_session)
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	}
)

/****************************
 * post method *
 ****************************/

app.post('/stripe/checkout-sessions', jsonParser, async (req, res) => {
	const stripeSecretKey = await fetchStripeSecret('STRIPE_SECRET_KEY')
	const stripe = new Stripe(stripeSecretKey)
	try {
		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: req.body.priceID,
					quantity: 1,
				},
			],
			payment_method_types: ['card'],
			mode: 'payment',
			success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.origin}/?canceled=true`,
			phone_number_collection: { enabled: true },
			metadata: {
				fullfillmentDate: 'today',
			},
			shipping_address_collection: {
				allowed_countries: ['US'],
			},
		})

		res.status(200).json(session)
	} catch (err) {
		console.log(err)
		res.status(err.statusCode || 500).json(err.message)
	}
})

app.post(
	'/stripe/webhook',
	express.raw({ type: 'application/json' }),
	async (req, res) => {
		const stripeSecretKey = await fetchStripeSecret('STRIPE_SECRET_KEY')
		const stripe = new Stripe(stripeSecretKey)
		const stripeWebhookSecret = await fetchStripeSecret('STRIPE_WEBHOOK_SECRET')
		const sig = req.headers['stripe-signature']
		console.log('the signature', sig)
		let event

		try {
			event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret)
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`)
			return
		}

		// Handle the event
		switch (event.type) {
			case 'checkout.session.completed':
				const paymentIntent = event.data.object

				console.log('webhook triggered', JSON.stringify(paymentIntent, null, 2))

				//fetch user, if they don't exist, create them.
				//use user details to create an Order
				break
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`)
		}

		// Return a 200 response to acknowledge receipt of the event
		res.send()
	}
)

module.exports = app
