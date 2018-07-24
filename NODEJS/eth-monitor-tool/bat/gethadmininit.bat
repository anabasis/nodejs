title geth-admin
geth --datadir "c:\ethereum\dataadmin" init "C:\ethereum\data\CustomGenesis.json"
geth --datadir "c:\ethereum\dataadmin" --ipcdisable --nodiscover --port "30304" --rpc --rpcport "8541" --networkid 15 --rpcapi "db, eth, net, web3, miner, personal" console 2>> "C:\ethereum\gethlog2.log"