Note:Procfile contain instructions for how to start the complete app.
Note:Heroku recognizes an app as Node.js by the existence of a package.json file in the root directory.


This is a chat application built in node.js using socket.io library.


Link:https://sunil-chat-app-v1.herokuapp.com/
open multiple tabs and chat with yourself :))

<important>
Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env, so you can pull it from there. Switch your listen to this:

.listen(process.env.PORT || 5000)

That way it'll still listen to port 5000 when you test locally, but it will also work on Heroku.
</important>
