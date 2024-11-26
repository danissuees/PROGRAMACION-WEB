const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql2');
const { jsPDF } = require("jspdf");
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const folder = path.join(__dirname, 'archivos');
const pdfFolder = path.join(__dirname, 'archivosgen');
if (!fs.existsSync(folder)) fs.mkdirSync(folder);
if (!fs.existsSync(pdfFolder)) fs.mkdirSync(pdfFolder);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567',
    database: 'tiendamusical'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conexión exitosa a la base de datos');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, folder),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

app.post('/Formulario/',
    upload.single('archivo'),
    [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio.'),
        body('descripcion').notEmpty().withMessage('El campo descripción es obligatorio.'),
        body('tipo').notEmpty().withMessage('El tipo de producto es obligatorio.'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
        body('estado').isIn(['Nuevo', 'Usado']).withMessage('El estado debe ser "Nuevo" o "Usado".')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const { nombre, descripcion, tipo, precio, estado } = req.body;
        const pdfPath = path.join(pdfFolder, `${req.file.filename}.pdf`); 

        try {
            const doc = new jsPDF();
            doc.text("Información del Producto:", 10, 10);
            doc.text(`Nombre: ${nombre}`, 10, 20);
            doc.text(`Descripción: ${descripcion}`, 10, 30);
            doc.text(`Tipo: ${tipo}`, 10, 40);
            doc.text(`Precio: $${precio}`, 10, 50);
            doc.text(`Estado: ${estado}`, 10, 60);

            if (req.file) {
                const imageData = fs.readFileSync(req.file.path).toString('base64');
                doc.addImage(`data:image/jpeg;base64,${imageData}`, "JPEG", 10, 70, 180, 160);
            }

            doc.save(pdfPath);

            const query = "INSERT INTO Productos (nombre, descripcion, tipo, precio, estado, imagen) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(query, [nombre, descripcion, tipo, precio, estado, pdfPath], (err, result) => {
                if (err) {
                    console.error('Error al guardar en la base de datos:', err);
                    return res.status(500).send('Error al guardar en la base de datos');
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename="producto.pdf"');
                res.sendFile(pdfPath);
            });
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            res.status(500).send('Error al generar el PDF');
        }
    }
);



app.get('/productos', (req, res) => {
    const query = "SELECT id_producto AS id, nombre, descripcion, tipo, precio, estado FROM Productos";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send('Error al obtener productos');
        }
        res.json(results);
    });
});


app.get('/productos/:id/pdf', (req, res) => {
    const productoId = req.params.id;

    const query = "SELECT * FROM Productos WHERE id_producto = ?";
    db.query(query, [productoId], (err, results) => {
        if (err) {
            console.error('Error al buscar el producto:', err);
            return res.status(500).send('Error al buscar el producto');
        }

        if (results.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        const producto = results[0];
        const pdfPath = path.join(pdfFolder, `${path.basename(producto.imagen, path.extname(producto.imagen))}.pdf`);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).send('PDF no encontrado');
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="producto.pdf"');
        res.sendFile(pdfPath);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
