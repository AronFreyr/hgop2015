var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      id:"01",
      comm:"CreateGame",
      userName : "Aron",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };
    then=[{
      id:"01",
      event:"GameCreated",
      userName: "Aron",
      timeStamp: "2015.12.02T11:29:44",
      name:"TheFirstGame"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with another user another time',function(){
    given= [];
    when={
      id:"02",
      gameId:"1",
      comm:"CreateGame",
      userName : "Freyr",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T10:29:44"
    };
    then=[{
      id:"02",
      gameId:"1",
      event:"GameCreated",
      userName: "Freyr",
      timeStamp: "2015.12.02T10:29:44",
      name:"TheFirstGame"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
