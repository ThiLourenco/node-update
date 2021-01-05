const http = require('http');
const socketIo = require('socket.io');
const { logger } = require('./utils');
const Routes = require('./routes');
const PORT = 3000

const handler = function (req, res) {
  const deafultRoute = async (req, res) => res.end('Hello World');

  const routes = new Routes(io);
  const chosen = routes[req.method.toLowerCase()] || deafultRoute;

  return chosen.apply(routes, [req, res]);
}

const server = http.createServer(handler);
const io = socketIo(server, {
  cors: {
    orgin:'*',
    credentials: false
  }
});

io.on('connection', (socket => logger.info('someone connected' + socket.id)));
// const interval = setInterval(() => {
//   io.emit('file-uploaded', 5e6);
  
// }, 250)

const startServer = () => {
  const { address, port } = server.address()
  logger.info(`app runing at http://${address}:${port}`);
}

server.listen(PORT, startServer);