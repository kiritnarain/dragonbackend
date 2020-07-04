//Acknowledgment: https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
const Net = require('net');
class TCPServer{
    constructor(port) {
        this.DragonSocket = null;
        const server = new Net.Server();

        server.listen(port, function() {
            console.log(`Server listening for connection requests on socket localhost:${port}`);
        });

        server.on('connection', function(socket) {
            console.log('A new connection has been established.');
            var isConnected = true;

            socket.write('{"action": "stop"}');

            var statusCheck = setInterval(() => {
                if(isConnected){
                    socket.write('{"action": "ping"}');
                }else{
                    clearInterval(statusCheck)
                }
            }, 3000);

            socket.on('data', (chunk) => {
                console.log(`Data received from client: ${chunk.toString()}`);
                var data = JSON.parse(chunk.toString());
                if(data['action']==='sync'){
                    this.DragonSocket = socket;
                }

            });


            socket.on('end', () => {
                console.log('Closing connection with the client');
                isConnected = false;
                if(socket===this.DragonSocket){
                    this.DragonSocket = null;
                }
            });

            socket.on('error', function(err) {
                console.log(`Error: ${err}`);
            });
        });
    }

    sendMessage(message){
        if(this.DragonSocket!=null){
            this.DragonSocket.write(message);
        }
    }

}