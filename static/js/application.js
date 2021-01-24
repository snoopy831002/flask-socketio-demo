$(document).ready(function(){

    var time = ((new Date()).getTime() / 1000)|0;
    var areaChartData = [
      // The first layer
      {
        label: "Layer 1",
        values: [ {time: time, y: 0},{time: time+1, y: 0} ] // default values
      },

      // The second layer
      {
        label: "Layer 2",
        values: [ {time: time, y: 0},{time: time+1, y: 0}] // default values
      },
    ];

    // create chart
    var areaChartInstance =  $('#areaChart').epoch({
        type: 'time.area',
        data: areaChartData
    });

    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var numbers_received = [];

    //receive details from server
    socket.on('newnumber', function(msg) {
        console.log("Received number" + msg.number);
        var time2 =((new Date()).getTime() / 1000)|0;
        var updatedData = [
            {time: time2, y: msg.number*10+20},
            {time: time2, y:msg.number*10}
        ];
        areaChartInstance.push(updatedData);
    });
});