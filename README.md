# snappcar-assignment

to run, `docker-compose up` in the root of the project
to test npm t in both service folders

this will run the pricing-service, booking-service, and mongodb



##example endpoint queries:

###pricing-service
//get pricing
POST http://localhost:7000/api/cars/<id> 
{
    "startDate": "2021-01-01T00:00:00.000Z",
    "endDate": "2021-01-01T00:01:00.000Z",
    "basePriceCents": 5000
}


###booking-service
//if car is booked during date range
POST http://localhost:7001/api/cars/605a40ee2e09ff00c8079465/isBooked
{
    "startDate":"2021-01-01T00:00:00",
    "endDate":"2021-01-02T00:00:00"
}

//create a new car
POST http://localhost:7001/api/cars/
{
  bookings:[{
    "startDate":"2021-01-01T00:00:00",
    "endDate":"2021-01-02T00:00:00"
    }]
}

//get car
GET http://localhost:7001/api/cars/<id>

//book car
POST http://localhost:7001/api/cars/605a40ee2e09ff00c8079465/bookings
{
    "startDate":"2021-01-01T00:00:00",
    "endDate":"2021-01-02T00:00:00"
}
