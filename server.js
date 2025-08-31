const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    server.listen(port, hostname, (err) => {
        if (err) {
            console.error('Error starting server:', err)
            process.exit(1)
        }

        console.log(
            `> Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`
        )
    })

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully')
        server.close(() => {
            console.log('Process terminated')
            process.exit(0)
        })
    })

    process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully')
        server.close(() => {
            console.log('Process terminated')
            process.exit(0)
        })
    })
}).catch((err) => {
    console.error('Error during app preparation:', err)
    process.exit(1)
})