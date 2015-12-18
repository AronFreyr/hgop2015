var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"01",
      event:"GameCreated",
      name:"Game01",
      userName: "Aron",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"01",
      event:"GameJoined",
      userName: "Freyr",
      otherUserName: "Aron",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"01",
        comm:"MakeMove",
        userName : "Aron",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe("one previous move", function(){
    it('placing move in same place should be illegal',function(){
      given.push({
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"01",
        comm:"MakeMove",
        userName : "Aron",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"01",
        event:"IllegalMove",
        userName:"Aron",
        name:"Game01",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When no moves are left", function(){
    it('No winner should produce a draw', function(){

      given.push(
      {
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:2,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:2,
        y:2,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:2,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:1,
        y:2,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      }
      );

      when={
        id:"01",
        comm:"MakeMove",
        userName:"Aron",
        name:"Game01",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"01",
        event:"Draw",
        userName:"Aron",
        otherUserName: "Freyr",
        name:"Game01",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });
  describe("When someone wins a game", function(){
    it('fullfilling win conditions should result in a win', function(){

      given.push(
      {
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Aron",
        name:"Game01",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"01",
        event:"MoveMade",
        userName:"Freyr",
        name:"Game01",
        x:0,
        y:2,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      }
      );

      when={
        id:"01",
        comm:"MakeMove",
        userName:"Aron",
        name:"Game01",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"01",
        event:"Win",
        userName:"Aron",
        name:"Game01",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });
});
