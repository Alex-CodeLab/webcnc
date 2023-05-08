

### WebCNC
WebCNC is a browser-based GUI for [FLuidNC](https://github.com/bdring/FluidNC/) machines.
It runs on any device (laptop, tablet). 
Websockets are used for communicating to ESP32/FluidNC.

(currently it does not yet support embedded use on ESP32 using `index.gz`, because it requires some minification etc.)

<img src="https://raw.githubusercontent.com/Alex-CodeLab/webcnc/main/docs/jog.png" width="300">
darkmode
<img src="https://raw.githubusercontent.com/Alex-CodeLab/webcnc/main/docs/darkmode.png" width="300">

### Status:
not ready, needs work.  

todo:
- [x] jog, using pure css 
- [x] bootstrap5 css
- [x] display websocket communication
- [x] send grbl messages from GUI
- [x] real-time status display
- [x] darkmode
- [ ] config/settings
- [ ] minify, gulp, etc.
- [ ] file upload, etc.
- [ ] docs
- [ ] tests
- [ ] ... much more

#### Installation

- Set the correct ip_address in `main.js`
- open index.html in a browser.

(for development, use `httpwatcher` for auto-reload)

#### Contribute

    - Fork it (https://github.com/yourname/yourproject/fork)
    - Create your feature branch (git checkout -b feature/fooBar)
    - Commit your changes (git commit -am 'Add some fooBar')
    - Push to the branch (git push origin feature/fooBar)
    - Create a new Pull Request
