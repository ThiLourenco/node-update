const url = require('url');
class Routes {
    #io
    constructor(io) {
      this.#io = io;
    }

    async post(request, response) {
      const { headers } = request;
      const { query: { socketId }} = url.parse(request.url, true);
      const redirecTo = headers.origin

      this.#io.to(socketId).emit('file-updloaded', 5e9);
      this.#io.to(socketId).emit('file-updloaded', 5e9);
      this.#io.to(socketId).emit('file-updloaded', 5e9);
      this.#io.to(socketId).emit('file-updloaded', 5e9);

      const onFinish = (response, redirecTo) => {
        response.writeHead(303, {
          Connection: 'Close',
          Location: `${redirecTo}?msg=Files uploaded with success!`
        });

        response.end();
      }
      setInterval(() => {
        return onFinish(response, headers.origin);  

      }, 2000);
    }
}

module.exports = Routes;