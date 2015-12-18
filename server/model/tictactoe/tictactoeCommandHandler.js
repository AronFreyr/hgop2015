var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          name: cmd.name

        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      var boardFull = true;
      for(var i = 0; i <= 2; i++){
        for(var j = 0; j <= 2; j++){
          if(gameState.board[i][j] ==='' && gameState.board[i][j] !== gameState.board[cmd.x][cmd.y]){
            boardFull = false;
          }
        }
      }
      if(boardFull === true){
        var win = true;
        for(var i = 0; i <= 2; i++){
          if(gameState.board[i][cmd.y] !== cmd.side && gameState.board[i][cmd.y] !== gameState.board[cmd.x][cmd.y]) {
            win = false;
          }
        }
          if(win === true){
            return[{
                id: cmd.id,
                event: "Win",
                userName: cmd.userName,
                otherUserName: cmd.otherUserName,
                name: cmd.name,
                x:cmd.x,
                y:cmd.y,
                side: cmd.side,
                timeStamp: cmd.timeStamp,
                //board: gameState.board
              }]
          }
        win = true;
        for(var i = 0; i <= 2; i++){
          if(gameState.board[cmd.x][i] !== cmd.side && gameState.board[cmd.x][i] !== gameState.board[cmd.x][cmd.y]) {
            win = false;
          }
       }
          if(win === true){
            return[{
                id: cmd.id,
                event: "Win",
                userName: cmd.userName,
                name: cmd.name,
                x:cmd.x,
                y:cmd.y,
                side: cmd.side,
                timeStamp: cmd.timeStamp
              }]
          }
        

        return [{
          id: cmd.id,
          event: "Draw",
          userName:"Aron",
          otherUserName: "Freyr",
          name:"Game01",
          x:cmd.x,
          y:cmd.y,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        }]
      }

      return [{
        id: cmd.id,
        event: "MoveMade",
        userName: cmd.userName,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
