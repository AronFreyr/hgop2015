var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"01",
      event:"GameCreated",
      userName: "Aron",
      timeStamp: "2015.12.02T11:29:44"
    }];
    when={
      id:"02",
      comm:"JoinGame",
      userName : "Freyr",
      name:"Game01",
      timeStamp: "2015.12.02T11:30:50"
    };
    then=[{
      id:"02",
      event:"GameJoined",
      userName: "Freyr",
      otherUserName: "Aron",
      timeStamp: "2015.12.02T11:30:50"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject joining of a non-existing game',function(){
    given= [];
    when={
      id:"02",
      comm:"JoinGame",
      userName : "Freyr",
      name:"Game01",
      timeStamp: "2015.12.02T11:30:55"
    };
    then=[{
      id:"02",
      event:"GameDoesNotExist",
      userName: "Freyr",
      timeStamp: "2015.12.02T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
