//Acknowledgment: https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
const Net = require('net');
module.exports = class TCPServer{

    constructor(port){
        this.DragonSocket = null;
        this.wifiSSID = "";
        this.lastSync = 0;

        const server = new Net.Server();

        server.listen(port, function() {
            console.log(`Server listening for connection requests on socket localhost:${port}`);
        });

        server.on('connection', (socket) => {
            console.log('A new connection has been established.');
            var isConnected = true;

            socket.write('{"action": "stop"}');

            var statusCheck = setInterval(() => {
                if(isConnected){
                    socket.write('{"action": "ping"}');
                    if(socket===this.DragonSocket && Date.now()-this.lastSync>10000){
                        this.DragonSocket = null;
                    }
                }else{
                    clearInterval(statusCheck)
                }
            }, 3000);

            socket.on('data', (chunk) => {
                console.log(`Data received from client: ${chunk.toString()}`);
                var data = JSON.parse(chunk.toString());
                if(data['action']==='sync'){
                    console.log('Sync successful');
                    this.DragonSocket = socket;
                    this.wifiSSID = data['ssid'];
                    this.lastSync = Date.now();

                }

            });


            socket.on('end', () => {
                console.log('Closing connection with the client');
                isConnected = false;
                if(socket===this.DragonSocket){
                    this.DragonSocket = null;
                }
                clearInterval(statusCheck);
            });

            socket.on('error', function(err) {
                console.log(`Error: ${err}`);
                clearInterval(statusCheck);
            });
        });
    }

    sendMessage(message){
        console.log(`TCPServer.js: Sending message `+message);
        if(this.DragonSocket!=null){
            console.log('Sent message');
            this.DragonSocket.write(message);
        }else{
            console.log('DragonSocket is null');
        }
    }

    getStatus(){
        var status = new Object();
        if(this.DragonSocket!=null){
            status.isConnected = true;
            status.wifiSSID = this.wifiSSID;
        }else{
            status.isConnected = false;
            status.wifiSSID = "";
        }
        var jsonString= JSON.stringify(status);
        return jsonString;
    }

};