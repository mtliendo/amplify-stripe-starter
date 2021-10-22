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
