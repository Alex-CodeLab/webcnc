


#### Connect
Currently, the IP address of the machine must be configured manually.
At the top of `websocket.js`, set the ip of your machine (using port `81)

    WebSocket('ws://192.168.1.100:81');

(On succesfull connection, the indicator in the Status tab should be green).


#### Darkmode
Bootstrap5 darkmode can be enabled simply by setting the theme at the top of the html:
`<html lang="en" data-bs-theme="light">`


#### Development
For development, use a simple webserver that reloads whenever changes are made to the html/css,
like https://github.com/thanethomson/httpwatcher or similar.




