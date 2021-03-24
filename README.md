snappcar-assignment
to run, `docker-compose up` in the root of the project where the docker-compose.yml file is located
to test npm t in both service folders
this will run the pricing-service, booking-service, and mongodb

1. To run through an example, create a car using the booking-service.
2. Note it's id.
3. you can send a query to pricing service to calculate the pricing
4. you can book for specified dates through the booking service

limitations and possible next steps:

1. include more data on the car object such as license plate number, baseprice etc...
2. add more unit tests
3. formalize api by creating request and response typescript objects
4. double check pricing formula
5. include more logging
6. add database indexes
7. a query in the form of get all cars that are not booked on <date-range> would be expensive
8. multiple services are included in the same repo for convenience :)

assumptions:

1. pricing formula is correct as I have interpreted it
2. there are no many to many relationships, so mongo is an ok solution

## example endpoint queries:

### pricing-service

the pricing service requires the booking service to be running in order to issue a get request to check if the car is booked for the specified date-range and throw an error for pricing as required

> Get pricing
> `POST` `http://localhost:7000/api/cars/ `
>
> ```javascript
> {
>   "startDate": "2021-01-01T00:00:00.000Z",
>   "endDate": "2021-01-01T00:01:00.000Z",
>    "basePriceCents": 5000
> }
> ```

### booking-service

> if car is booked during date range
> `POST` `http://localhost:7001/api/cars/605a40ee2e09ff00c8079465/isBooked`
>
> ```javascript
> {
>   "startDate":"2021-01-01T00:00:00",
>   "endDate":"2021-01-02T00:00:00"
> }
> ```

> Create a new car
> `POST` `http://localhost:7001/api/cars/ `
> {
>
> ```javascript
> {
>    "bookings":[
>        {
>        "startDate":"2021-01-01T00:00:00",
>        "endDate":"2021-01-02T00:00:00"
>        }
>    ]
> }
> ```

> Get car  
> `GET` `http://localhost:7001/api/cars/`

> Book car  
> `POST` `http://localhost:7001/api/cars/605a40ee2e09ff00c8079465/bookings `
>
> ```javascript
> {
>   "startDate":"2021-01-01T00:00:00",
>   "endDate":"2021-01-02T00:00:00"
> }
> ```
