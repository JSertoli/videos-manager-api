// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     console.log('Server is running...')

//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    const search = request.query.search

    const videos = database.list(search)

    return videos
})

server.put('/videos/:id', () => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    const video = database.update(videoId, {
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', () => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333
})