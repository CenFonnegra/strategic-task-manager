
import {
    SESClient,
    SendEmailCommand
} from "@aws-sdk/client-ses";

const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

const command = new SendEmailCommand({
    Source: "willy1323@hotmail.com",

    Destination: {
        ToAddresses: ["willy1323@hotmail.com"]
    },
    Message: {
        Subject: {
            Data: "Resumen de tareas"
        },
        Body: {
            Text: {
                Data: "Este es un resumen de tus tareas."
            }
        }
    }
});

export async function POST() {
    try {
        await sesClient.send(command);
        return Response.json({
            message: "Correo enviado correctamente"
        });
    } catch (error) {
        console.error("Error enviando correo", error);

        return Response.json(
            {
                message: 'Error enviando correo'
            },
            {
                status: 500
            }
        );
    }
}