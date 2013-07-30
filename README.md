template_node_express_dust
==========================

Basic template for an application for node.js/express using dust-linkedin templates. There are 3 examples inside: server side, client side and mixed (client and server side) templates.

## Install

1 . Clone the repo
2 . cd /path/cloned/repo
3 . npm install
4 . node app.js

## Server side templates

The index page is rendered server side. Look at routes/index.js, views/indes.dust and app.get('/', routes.index); rule in app.js.

## Client side templates

The index page is rendered on client side. Look at client.html and dustviews/user.js. In this case dustviews/user.js is a precompiled version of /views/clientside/user.dust. I compiled it with "dustc user.dust user.js" and moved to the public folder.

The route for the get is this:

	app.get('/client', function(request, response) {
	  var data = fs.readFileSync('client.html');
	  response.send(data.toString());
	});

Its using readFileSync, this is bad so take this as a example.

## Mixed client and server side templates

This example is rendering one part server side and the other client side. The route in app.js for this example is:

	//this rule is rendered both, client and server
	app.get('/users', user.list);

See /views/user.dust. One part is rendering server side, and the other client side, notice the include:

	<script src="/js/dust-core-2.0.0.min.js"></script>
	<script type="text/javascript" src="/dustviews/user.js"></script>

We are rendering user.js template client side (the same compiled version of /views/clientside/user.dust we used in "Client side templates" example)


