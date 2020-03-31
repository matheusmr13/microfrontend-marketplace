const {CloudTasksClient} = require('@google-cloud/tasks');

async function createTask(
  project = 'microfrontend-marketplace', // Your GCP Project id
  queue = 'test-queue', // Name of your Queue
  location = 'us-east1', // The GCP region of your queue
  payload = 'Hello, World!', // The task HTTP request body
  inSeconds = 0 // Delay in task execution
) {
  const client = new CloudTasksClient();

  const parent = client.queuePath(project, location, queue);

  const task = {
    appEngineHttpRequest: {
      httpMethod: 'POST',
      relativeUri: '/task_test',
    },
  };

//   if (payload) {
//     task.appEngineHttpRequest.body = Buffer.from(payload).toString('base64');
//   }

//   if (inSeconds) {
//     // The time when the task is scheduled to be attempted.
//     task.scheduleTime = {
//       seconds: inSeconds + Date.now() / 1000,
//     };
//   }

  console.log('Sending task:');
  console.log(task);

  const request = {parent, task};
  const [response] = await client.createTask(request);
  const name = response.name;
  console.log(`Created task ${name}`);
}

export default createTask;