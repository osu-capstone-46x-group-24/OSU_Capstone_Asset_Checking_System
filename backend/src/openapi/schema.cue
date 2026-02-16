// API Documentation
package api

import ("time")

$version: "v1.0.0"
info: {
	description: "API documentation for your service"
}

// Items are pieces of equipment that we can checkout
#Item: {
	// name of item
	name!: string
	// rfid of item
	rfid!: string
}

// An event which is logged
#Event: {
	// timestamp associated with event
	timestamp?: time.Time
	// type of event
	type!: string
	// message to log
	message!: string
}

#Checkout: {
	// UserID
	userId!: int32
	// ItemID's to checkout
	items!: [...int32]
	// Expected time of return
	expectedReturn: time.Time
}

#Checkin: #Item
