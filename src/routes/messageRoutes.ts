import express from 'express'; 
import * as MessageController from '../controllers/messageController'; 

const router = express.Router();

/**
 * @openapi
 * components:
 * schemas:
 * Message:
 * type: object
 * required:
 * - sender
 * - receiver
 * - content
 * properties:
 * _id:
 * type: string
 * format: objectid
 * description: El ID único del mensaje generado por MongoDB.
 * sender:
 * type: string
 * format: objectid
 * description: El ID del usuario que envió el mensaje (referencia a User).
 * receiver:
 * type: string
 * format: objectid
 * description: El ID del usuario que recibe el mensaje (referencia a User).
 * content:
 * type: string
 * description: El contenido del mensaje.
 * date:
 * type: string
 * format: date-time
 * description: La fecha y hora en que se envió el mensaje (generado automáticamente).
 * replyTo:
 * type: string
 * format: objectid
 * description: El ID del mensaje al que se está respondiendo (opcional, referencia a Message).
 * example:
 * _id: "60c72b3f9b1d8e3f5c8e4f1a"
 * sender: "60c72b3f9b1d8e3f5c8e4f1b"
 * receiver: "60c72b3f9b1d8e3f5c8e4f1c"
 * content: "Hola, ¿cómo estás?"
 * date: "2023-10-27T10:30:00.000Z"
 * replyTo: null
 */

/**
 * @openapi
 * /api/messages:
 * post:
 * summary: Crear un nuevo mensaje
 * tags: [Messages]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - sender
 * - receiver
 * - content
 * properties:
 * sender:
 * type: string
 * format: objectid
 * description: ID del remitente.
 * receiver:
 * type: string
 * format: objectid
 * description: ID del destinatario.
 * content:
 * type: string
 * description: Contenido del mensaje.
 * replyTo:
 * type: string
 * format: objectid
 * description: ID del mensaje al que se responde (opcional).
 * responses:
 * 201:
 * description: Mensaje creado exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Message'
 * 400:
 * description: Datos de entrada inválidos.
 * 500:
 * description: Error interno del servidor.
 */
router.post('/', MessageController.createMessageHandler); 

/**
 * @openapi
 * /api/messages:
 * get:
 * summary: Obtener una lista de mensajes (paginada)
 * tags: [Messages]
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * description: Número de página para la paginación.
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * description: Número de mensajes por página.
 * - in: query
 * name: search
 * schema:
 * type: string
 * description: Término de búsqueda para filtrar mensajes (ej. por contenido).
 * responses:
 * 200:
 * description: Lista de mensajes obtenida correctamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * messages:
 * type: array
 * items:
 * $ref: '#/components/schemas/Message'
 * total:
 * type: integer
 * page:
 * type: integer
 * limit:
 * type: integer
 * 500:
 * description: Error interno del servidor.
 */
router.get('/', MessageController.getAllMessagesHandler); 
/**
 * @openapi
 * /api/messages/{id}:
 * get:
 * summary: Obtener un mensaje por su ID
 * tags: [Messages]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: objectid
 * description: El ID del mensaje a obtener.
 * responses:
 * 200:
 * description: Mensaje encontrado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Message'
 * 404:
 * description: Mensaje no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
router.get('/:id', MessageController.getMessageByIdHandler); 

/**
 * @openapi
 * /api/messages/{id}:
 * put:
 * summary: Actualizar un mensaje por su ID (ej. actualizar contenido)
 * tags: [Messages]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: objectid
 * description: El ID del mensaje a actualizar.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties: # Define aquí sólo los campos que permites actualizar
 * content:
 * type: string
 * description: El nuevo contenido del mensaje.
 * # example: # Puedes añadir un ejemplo si quieres
 * #   content: "Contenido actualizado."
 * responses:
 * 200:
 * description: Mensaje actualizado exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Message'
 * 400:
 * description: Datos de entrada inválidos.
 * 404:
 * description: Mensaje no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
router.put('/:id', MessageController.updateMessageHandler); 

/**
 * @openapi
 * /api/messages/{id}:
 * delete:
 * summary: Eliminar un mensaje por su ID
 * tags: [Messages]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: objectid
 * description: El ID del mensaje a eliminar.
 * responses:
 * 200: # O 204 No Content si no devuelves nada
 * description: Mensaje eliminado exitosamente.
 * 404:
 * description: Mensaje no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
router.delete('/:id', MessageController.deleteMessageHandler); 

export default router;