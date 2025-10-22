const { createServer } = require('http')
const { createServer: createHttpsServer } = require('https')
const { parse } = require('url')
const fs = require('fs')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const httpsPort = parseInt(process.env.HTTPS_PORT || '3443', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname })
const handle = app.getRequestHandler()

// SSL Configuration
let sslOptions = null
try {
    sslOptions = {
        key: fs.readFileSync('./ssl/private.key'),
        cert: fs.readFileSync('./ssl/cert.pem'),
        ca: fs.readFileSync('./ssl/intermediate.pem')
    }
} catch (error) {
    console.warn('SSL certificates not found, HTTPS will not be available:', error.message)
}

app.prepare().then(() => {
    // HTTP Server
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    httpServer.listen(port, hostname, (err) => {
        if (err) {
            console.error('Error starting HTTP server:', err)
            process.exit(1)
        }

        console.log(
            `> HTTP Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`
        )
    })

    // HTTPS Server (if SSL certificates are available)
    if (sslOptions) {
        const httpsServer = createHttpsServer(sslOptions, (req, res) => {
            const parsedUrl = parse(req.url, true)
            handle(req, res, parsedUrl)
        })

        httpsServer.listen(httpsPort, hostname, (err) => {
            if (err) {
                console.error('Error starting HTTPS server:', err)
                process.exit(1)
            }

            console.log(
                `> HTTPS Server listening at https://${hostname}:${httpsPort} as ${dev ? 'development' : process.env.NODE_ENV}`
            )
            console.log(`> Domain: www.addxcell.work.gd`)
        })
    }

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully')
        httpServer.close(() => {
            if (sslOptions) {
                httpsServer.close(() => {
                    console.log('Process terminated')
                    process.exit(0)
                })
            } else {
                console.log('Process terminated')
                process.exit(0)
            }
        })
    })

    process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully')
        httpServer.close(() => {
            if (sslOptions) {
                httpsServer.close(() => {
                    console.log('Process terminated')
                    process.exit(0)
                })
            } else {
                console.log('Process terminated')
                process.exit(0)
            }
        })
    })
}).catch((err) => {
    console.error('Error during app preparation:', err)
    process.exit(1)
})