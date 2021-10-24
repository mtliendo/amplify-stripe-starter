Things that need to be fetched ahead of time:

- amplify-stripe-starter repo
-

Things needed to be created before jumping in the code:

- SNS Topic
- Tracker
- Geofence Collection
- EventBus

amplify init with nextjs
setup ssm secrets
update package.json build script with `&& next export` (this will all be client side)

amplify add auth

- the user gets subscribed to an SNS topic with a filter policy.

amplify add api

- graphql

```graphql
type Order
	@model
	@auth(
		rules: [
			{ allow: owner }
			{ allow: groups, groups: ["drivers"], operations: [read, update] }
			{ allow: private, provider: iam, operations: [create, update] }
		]
	) {
	id: ID!
	owner: AWSEmail!
	customerDetails: CustomerDetails!
	productPriceID: String!
	orderStatus: ORDER_STATUS!
	driverLocation: DriverLocation
}

type CustomerDetails {
	name: String!
	streetName: String!
	city: String!
	state: String!
	zipCode: String!
}

enum ORDER_STATUS {
	PROCESSING
	EN_ROUTE
	DELIVERED
}

type DriverLocation {
	lng: String
	lat: String
}

# let customer subscribe to updates for their own order so the marker can update whenever the drivers location changes.

type Subscription {
	onOrderUpdateByID(orderID: ID!): Order
		@aws_subscribe(mutations: ["updateOrder"])
}
```

amplify add api

- rest
- add resource rules for auth and api so webhook can call cognito to create and read users and also so that it can call AppSync (iam)
- include code for paths
- add secrets
- add dynamodb trigger so that a geofence is created around the users home (turf.js + geofence naming)
- add route to update location (used in expo app)

Add map

- amplify add geo
- place map with static marker for restaurant location
- fetched static marker pulled from order info
- dynamic where its location is based on location updates from the driverDetails in the order

create expo app

- share backend
- fetch orders

create sns topic
create tracker
create geofence collection
don't create rule
paste this rule:
{
"source": ["aws.geo"],
"resources": ["arn:aws:geo:us-east-1:936471194299:geofence-collection/stripe-geofences"],
"detail-type": ["Location Geofence Event"],
"detail": {
"EventType": ["ENTER"]
}
}

put in random function as target.
create function to publish to sns
postconfirm: add subscribe user to sns topic with o
