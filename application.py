"""
Demo of Flask application and socket.io

Inspired by : https://github.com/shanealynn/async_flask
"""

# Start with a basic flask app webpage.
from flask_socketio import SocketIO
from flask import Flask, render_template
from threading import Thread, Event

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True

#Initiate socketio server
socketio = SocketIO(app, async_mode=None, logger=True, engineio_logger=True)

#socket notification Thread
thread = Thread()
thread_stop_event = Event()

def serverNotification():
    """
    Prototype of server sent notification to web client
    """
    while not thread_stop_event.isSet():
        # socket io server send data to client
        socketio.emit('notify', {'number': 0}, namespace='/channel')
        socketio.sleep(1)


@app.route('/')
def index():
    # only by sending this page first will the client be connected to the socketio instance
    return render_template('index.html')

@socketio.on('connect', namespace='/channel')
def test_connect():
    # need visibility of the global thread object
    global thread
    print('Client connected')

    #Start the random number generator thread only if the thread has not been started before.
    if not thread.is_alive():
        print("Starting Thread")
        thread = socketio.start_background_task(serverNotification)

@socketio.on('disconnect', namespace='/channel')
def test_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    print("Server running")
    socketio.run(app,port=5001)