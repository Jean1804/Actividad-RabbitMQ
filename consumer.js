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
    const Matricula="2-17-1955";

    try {
        
        const conn = await ampq.connect(rabbitSetting);
        console.log("Conectado!!!");

        const channel = await conn.createChannel();
        console.log("Canal creado satisfactoriamente!!!");

        const res = await channel.assertQueue(queue);
        console.log("Cola creada satisfactoriamente!!!");

        console.log(`Esperando los mensaje de ${Matricula}`);
        channel.consume(queue, message => {
            let student = JSON.parse(message.content.toString());
            console.log(`Estudiante recibido ${student.Estudiante}`);
            console.log(student);

            if(student.Matricula == Matricula)
            {
                channel.ack(message);
                console.log("Mensaje borrado de la cola...\n");
            }
            else
            {
                console.log("El mensaje no es para mi... No deseo eliminarlo...");
            }

        })

    } catch (err) {
        console.error(`Error -> ${err}`);
    }

}