import {
    SESClient,
    SendEmailCommand,
  } from "@aws-sdk/client-ses";
  
  const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  
  interface Task {
    title: string;
    description: string;
    completed: boolean;
  }
  
  interface RequestBody {
    email: string;
    tasks: Task[];
  }
  
  export async function POST(request: Request) {
    try {
      const body = (await request.json()) as RequestBody;
  
      const { email, tasks } = body;
  
      if (!email || !tasks) {
        return Response.json(
          {
            message: "El correo y las tareas son obligatorios",
          },
          {
            status: 400,
          }
        );
      }
  
      const completedTasks = tasks.filter(
        (task) => task.completed
      ).length;
  
      const pendingTasks = tasks.filter(
        (task) => !task.completed
      ).length;
  
      const taskList =
        tasks.length === 0
          ? "No tienes tareas registradas."
          : tasks
              .map(
                (task) =>
                  `- ${task.title} — ${
                    task.completed ? "Completada" : "Pendiente"
                  }\n  ${task.description}`
              )
              .join("\n\n");
  
      const emailContent = `
  Resumen de tus tareas
  
  Total de tareas: ${tasks.length}
  Completadas: ${completedTasks}
  Pendientes: ${pendingTasks}
  
  Detalle:
  
  ${taskList}
  
  Strategic Task Manager
  `;
  
      const command = new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL!,
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Data: "Resumen de tus tareas - Strategic Task Manager",
          },
          Body: {
            Text: {
              Data: emailContent,
            },
          },
        },
      });
  
      await sesClient.send(command);
  
      return Response.json({
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      console.error("Error enviando correo:", error);
  
      return Response.json(
        {
          message: "Error enviando correo",
        },
        {
          status: 500,
        }
      );
    }
  }