var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  function send_content(content) {
      ws.send(JSON.stringify({content}))
  }
  function send_style(style) {
      ws.send(JSON.stringify({style}))
  }
  ws.send(`<h1>${new Date()}</h1>`)
  ws.on('message', function (message) {
    console.log('received: %s', message)
    send_content(`<h1>message</h1>`)
  })

  setTimeout(function () {send_style("h1 {color: red}")}, 10000)
  setTimeout(function () {send_style("h1 {color: blue}")}, 20000)
  var id = setInterval(
    () => {
      try {
        send_content(`<h1>${new Date()}</h1>`)
      } catch(x) {
        clearInterval(id)
      }
    },
    1000
  )
})
