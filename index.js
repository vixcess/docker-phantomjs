const webpage = require("webpage")
const webserver = require("webserver")
const env = require("system").env

const width = env["WIDTH"] || 640
const height = env["HEIGHT"] || 360
const port = env["PORT"] || 8910

const server = webserver.create()
server.listen(port, function (req, res) {
    const page = webpage.create()
    page.viewportSize = {
    	width: width,
    	height: height
    }
    page.setContent(req.post, "")
    const b = atob(page.renderBase64("png"))
    page.close()

    res.statusCode = 200
    res.setEncoding("binary")
    res.headers = {
        "Cache": "no-cache",
        "Content-Type": "image/png",
        "Content-Length": b.length
    };
    res.write(b)
    res.close()
})

console.log("bound on " + port)
