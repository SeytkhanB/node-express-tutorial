JWT <-- json web token - is just a way to exchange data between two parties.
Why using JWT - it is far better than just some random string, simply because JWT
has a security feature where we can be sure about the entegrity of our data.
If the token passes the validation, it means it is the same token we sent to
the client and the data wasn't tampered/faked with

Also, one of the feature of HTTP is that it is stateless and that simply means
that server doesn't know or doesn't remember any previous requests sent by the
same client. And as the result, event after many times of sending requests
front end will still need to provide the valid token. Otherwise the access will
be denied
