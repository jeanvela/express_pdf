import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import multer from 'multer'
import cors, { CorsOptions } from 'cors'
import router from './routes/index'
import cookieParser from 'cookie-parser'

const app = express()

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename(req, file, callback) {
        callback(null, `${Date.now()}${file.originalname}`)
    },
})

const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        if (file.mimetype === 'application/pdf') {
            return callback(null, true)
        } else {
            callback(new Error('Tipo de archivo no valido') as any, false)
        }
    },
})

interface AppError {
    message: string;
    code?: number;
}

const options: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Custom-Header1', 'Custom-Header2']
}

app.use(cors(options))

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//* Manejo de errores
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: 'Error al subir el archivo' });
    } else if (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    } else {
        next();
    }
})

//* Middleware para la subida de archivos
app.use((req, res, next) => {
    upload.single('myFile')(req, res, function (err) {
        if (err) {
            res.status(404).json({error: err.message})
        } else {
            next()
        }
    })
})

app.use('/', router)

app.get('/', (req, res) => {
    res.send('Hello world')
})

export default app