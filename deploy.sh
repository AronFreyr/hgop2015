echo 'Turning on docker'
docker run -p 9000:8080 -d --name="tictactoe" -e "NODE_ENV=development" aronfreyr/tictactoe

docker ps

echo 'Killing tictactoe'
docker kill tictactoe

docker ps -a

echo 'Removing tictactoe'
docker rm tictactoe

docker ps -a

echo 'Connecting to the other machine'
ssh vagrant@192.168.56.77 "
 docker pull aronfreyr/tictactoe
 docker run -p 9090:8080 -d --name='tictactoe' -e 'NODE_ENV=production' aronfreyr/tictactoe
"
