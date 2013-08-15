# Python Code:
from BaseHTTPServer import HTTPServer 
from BaseHTTPServer import BaseHTTPRequestHandler
# server:


def start_server(port=8080):
	#configServer()
	host_name = '' # !!!REMEMBER TO CHANGE THIS!!!
	port_number = port # Maybe set this to 9000.
	httpd = HTTPServer((host_name, port_number), Handler)
	print "STARTING SERVER!"
	try: httpd.serve_forever()
	except ValueError: pass
	httpd.server_close()

class Handler(BaseHTTPRequestHandler):
	response = ""
	def do_HEAD(self):
		self.send_response(200)
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header("Content-type", "text/html")
		self.end_headers()
	def do_GET(self):
		self.send_response(200)
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header("Content-type", "text/html Access-Control-Allow-Origin: *")
		self.end_headers()			
		
		if self.path == "/cmd":
			print "HANDLING RESPONSE"
			print "with :" + self.response
			self.wfile.write(self.response)
			Handler.response = ""
			     
	
import thread
t = thread.start_new_thread(start_server, (8080,))
import sys
inp = "Starting!"
while inp != "exit":
	inp = raw_input()
	print "Trying to send:"
	print inp
	Handler.response = inp

	
