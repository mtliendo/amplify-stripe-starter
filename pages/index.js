import { useEffect, useState } from 'react'
import getStripe from '../get-stripe'
import { API } from 'aws-amplify'
const Home = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		API.get('stripeapi', '/stripe/products').then((productData) => {
			console.log(productData)
			setProducts(productData)
		})
	}, [])

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search)

		if (query.get('success')) {
			console.log('Order placed! You will receive an email confirmation.')
		}

		if (query.get('canceled')) {
			console.log(
				'Order canceled -- continue to shop around and checkout when you’re ready.'
			)
		}
	}, [])

	const handleProductClick = async (priceID) => {
		const data = await API.post('stripeapi', '/stripe/checkout-sessions', {
			body: { priceID },
		})

		console.log(JSON.stringify(data, null, 2))
		const stripe = await getStripe()
		await stripe.redirectToCheckout({ sessionId: data.id })
	}

	const handleSubscribeClick = async () => {
		const data = await API.post('stripeapi', '/subscribe-to-notifications', {
			body: { orderID: 'testing', phoneNumber: '+15633496229' },
		})
	}

	return (
		<main>
			<button onClick={handleSubscribeClick}>Test Subscribe</button>
			{products.map((product) => {
				return (
					<article
						style={{ border: '1px solid black', margin: '20px' }}
						key={product.priceID}
						onClick={() => handleProductClick(product.priceID)}
					>
						<h2>{product.name}</h2>
						<h2>
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
							}).format(product.price)}
						</h2>
						<p>{product.description}</p>
					</article>
				)
			})}
		</main>
	)
}

export default Home
