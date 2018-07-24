module.exports = {
  server_port: 3000,
  db_url : 'mongodb://localhost:27017/local', //set db table
  db_schemas : [
    {file: './block/block_schema.js',
    collection: 'block',
    schemaName: 'BlockSchema',
    modelName : 'blockModel'},

    {file: './transaction/tx_schema.js', //for transactions
    collection: 'transaction',
    schemaName: 'TxSchema',
    modelName : 'txModel'},

    {file: './statistics/stats_schema.js', //for statistics
    collection: 'statistics',
    schemaName: 'StatSchema',
    modelName : 'statsModel'},

    {file: './blockcontainer/container_schema.js',
    collection: 'blockContainer',
    schemaName: 'containerSchema',
    modelName: 'containerModel'},
  ]
};
