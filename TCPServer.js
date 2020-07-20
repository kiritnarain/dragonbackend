//Acknowledgment: https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
const Net = require('net');
const TIMEOUT_MILI = 3500;

module.exports = class TCPServer{
    ACTION_STOP = "stop"; //JSON stop action
    ACTION_MOVE = "move"; //JSON move action

    constructor(port){
        this.DragonSocket = null;
        this.wifiSSID = "";
        this.lastSync = 0;
        this.lastAction = this.ACTION_STOP;

        const server = new Net.Server();

        server.listen(port, function() {
            console.log(`Server listening for connection requests on socket localhost:${port}`);
        });

        server.on('connection', (socket) => {
            console.log('A new connection has been established.');
            var isConnected = true;

            socket.write('{"action": "'+this.ACTION_STOP+'"}');

            var statusCheck = setInterval(() => {
                if(isConnected){
                    socket.write('{"action": "ping", "lastAction": "'+this.lastAction+'"}');
                    if(socket===this.DragonSocket && Date.now()-this.lastSync>TIMEOUT_MILI){
                        this.DragonSocket = null;
                        this.lastAction = this.ACTION_STOP;
                    }
                }else{
                    clearInterval(statusCheck)
                }
            }, 1000);

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

    /**
     * Send JSON message to connected clients
     * @param message JSON message of the form {"action": ..., "param1": "arg1", ...}
     * @param actionStr Either ACTION_STOP or ACTION_MOVE
     */
    sendMessage(message, actionStr){
        console.log(`TCPServer.js: Sending message `+message);
        this.lastAction = actionStr;
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