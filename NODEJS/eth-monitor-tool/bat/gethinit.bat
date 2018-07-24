title geth-administrator-admin
geth --datadir "c:\ethereum\data" init "C:\ethereum\data\CustomGenesis.json"
geth --datadir "c:\ethereum\data" --identity node1 --port 30303 --maxpeers 10  --rpc --nat=extip:10.0.1.78 --rpcport "8545" --rpccorsdomain "*" --networkid 15 --rpcapi "db, eth, net, web3, miner, personal" console 2>> "C:\ethereum\gethlog.log"