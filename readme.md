

### WebCNC
WebCNC is a browser-based GUI for [FLuidNC](https://github.com/bdring/FluidNC/) machines.
It runs on any device (laptop, tablet). 
Websockets are used for communicating to ESP32/FluidNC.

<img src="https://raw.githubusercontent.com/Alex-CodeLab/webcnc/main/docs/jog.png" width="300">
darkmode
<img src="https://raw.githubusercontent.com/Alex-CodeLab/webcnc/main/docs/darkmode.png" width="300">

### Status:
Alpha


todo:
- [x] jog, using pure css 
- [x] bootstrap5 css
- [x] display websocket communication
- [x] send grbl messages from GUI
- [x] real-time status display
- [x] darkmode
- [x] track states
- [x] tooltips
- [x] start/stop controls
- [x] send control signals
- [ ] send jogspeed
- [x] read & select files / ssd
- [x] config/settings
- [x] read settings
- [x] save config
- [x] display  system info
- [x] manage files
- [ ] manage folders
- [x] file upload 
- [x] create embedded index.html.gz
- [ ] docs
- [ ] tests
- [ ] ...

#### Installation

Upload `index.html.gz` to your device.


Or, if you want to use it from a local (development) computer: 

- Set the correct ip_address in `websocket.js`

and start a simple webserver. There are a few options:

    python -m SimpleHTTPServer

If using Pycharm IDE (or similar), use the build-in server to open index.html.
Or, for auto-reload during development, use `httpwatcher`

(Note: Some things do not work if CORS is not disabled in the browser).


#### embedded index.html
The file `index.html.gz` can be generated with the command: 

    python make_index.py

Alternative upload method: 
[Fluidterm](https://github.com/bdring/FluidNC/tree/main/fluidterm)


#### Contribute
This is an Opensource project - all contributions appreciated!
    
    - Fork it (https://github.com/yourname/yourproject/fork)
    - Create your feature branch (git checkout -b feature/fooBar)
    - Commit your changes (git commit -am 'Add some fooBar')
    - Push to the branch (git push origin feature/fooBar)
    - Create a new Pull Request
