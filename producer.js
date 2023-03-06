const ampq = require("amqplib");

const rabbitSetting = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'jurena',
    password: 'Jean1804',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

async function connect()
{
    const queue = "Estudiantes";

    const msgs=
    [
        {"Estudiante":"Jean Luciano Ureña", "Matricula":"2-17-1955"},
        {"Estudiante":"Anthony Alejandro Ureña", "Matricula":"1-25-3012"},
        {"Estudiante":"Luis Miguel Basteri", "Matricula":"1-17-2034"}
    ]
    try {
        
        const conn = await ampq.connect(rabbitSetting);
        console.log("Conectado!!!");

        const channel = await conn.createChannel();
        console.log("Canal creado satisfactoriamente!!!");

        const res = await channel.assertQueue(queue);
        console.log("Cola creada satisfactoriamente!!!");

        for(let msg in msgs)
        {
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Mensaje enviado a la cola ${queue}`);
        }

    } catch (err) {
        console.error(`Error -> ${err}`);
    }

}
