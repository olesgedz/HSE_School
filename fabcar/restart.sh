sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)
sudo docker rmi $(sudo docker images dev-* -q)
sudo docker network prune
sudo ./startFabric.sh node
node enrollAdmin.js
node registerUser.js
node invoke.js initLedger