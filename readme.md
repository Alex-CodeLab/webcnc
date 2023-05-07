

### WebCNC
WebCNC is a browser-based GUI for [FLuidNC](https://github.com/bdring/FluidNC/) machines.
It uses websockets for communicating to the device.

<img src="https://raw.githubusercontent.com/Alex-CodeLab/webcnc/main/docs/jog.png" width="300">
darkmode
<img src="https://raw.githubusercontent.com/Alex-CodeLab/webcnc/main/docs/darkmode.png" width="300">

### Status:
not ready, needs work.  

todo:
- [x] jog, pure css 
- [x] bootstrap5 css
- [x] display websocket communication
- [x] send grbl messages from GUI
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
