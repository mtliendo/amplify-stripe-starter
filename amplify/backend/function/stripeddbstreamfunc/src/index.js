const AWS = require('aws-sdk')
const circle = require('@turf/circle').default
const location = new AWS.Location()
// This function requires a place index and a geofence to be created
exports.handler = async (event) => {
	console.log(JSON.stringify(event.Records, null, 2))
	for (const streamedItem of event.Records) {
		if (streamedItem.eventName === 'INSERT') {
			console.log('event addes', JSON.stringify(streamedItem, null, 2))
			//1. Get the customer's address
			const streetName =
				streamedItem.dynamodb.NewImage.customerDetails.M.streetName.S
			const city = streamedItem.dynamodb.NewImage.customerDetails.M.city.S
			const state = streamedItem.dynamodb.NewImage.customerDetails.M.state.S
			const zipCode = streamedItem.dynamodb.NewImage.customerDetails.M.zipCode.S
			const geofenceID = streamedItem.dynamodb.NewImage.id.S

			//2. Geocode the address to get a lng and lat: https://docs.aws.amazon.com/location/latest/developerguide/search-place-index-geocoding.html
			const geoData = await location
				.searchPlaceIndexForText({
					IndexName: 'stripe-places',
					Text: `${streetName} ${city}, ${state} ${zipCode}`,
				})
				.promise()
				.catch((err) => console.log(err))

			console.log('the geo data', JSON.stringify(geoData, null, 2))

			// 2. create a geofence with above coordinates using turf.js
			const [lng, lat] = geoData.Results[0].Place.Geometry.Point
			const dynamicGeofenceResult = circle([lng, lat], 0.25, {
				steps: 10,
				units: 'miles',
			})
			console.log(
				'dynamicGeofenceResult',
				JSON.stringify(dynamicGeofenceResult, null, 2)
			)

			//3. add that geofence to the geofence collection
			const result = await location
				.putGeofence({
					CollectionName: 'stripe-geofences',
					GeofenceId: geofenceID,
					Geometry: { Polygon: dynamicGeofenceResult.geometry.coordinates },
				})
				.promise()
			console.log('added?', result)
		}
	}
	return { status: 'done' }
}
