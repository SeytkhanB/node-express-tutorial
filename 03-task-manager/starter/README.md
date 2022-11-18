// DIFFERENCE BETWEEN "PUT" AND "PATCH"
// PUT is for checking if resource exists then update, else create new resource.
// and also PUT will remove other fields except for given. when we work wih PUT
// the expectation is "replace item"

// PATCH is always for updating a resource. when we are working with PATCH, we
// are just uploading the properties that we are passing

// REST stands for "Representational State Transfer" and arguably/probaly
// the most popular API design pattern. And essentially it's a pattern that
// combines HTTP verbs, route path and our recourses. So, effectivelly
// REST determines how the API looks like. It is a pattern, NOT a strictly
// enforced set of rules

// NON RELATIONAL AND RELATIONAL DB. So, what's the difference?
// A relational database is structured, meaning the data is organized
// in tables, like in exel. Many times, the data within these tables have
// relationships with one another, or dependencies.
// A non relational database
// is document-oriented, meaning, all information gets stored in more of a
// laundry list order. In non relatioanl db we can store our data in json

// In mongodb we have data base. Inside db we have collections that collect
// documents i.e data. and data inside collections we can store different data
