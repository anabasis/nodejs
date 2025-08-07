package com.seegene.main.global.config.database;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableTransactionManagement
@Slf4j
public class ReplicationDataSourceConfig {

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Value("${spring.datasource.url.rw}")
    private String readWriteUrl;

    @Value("${spring.datasource.url.ro}")
    private String readOnlyUrl;

    @Value("${spring.datasource.username}")
    private String userName;

    @Value("${spring.datasource.password}")
    private String passWord;

    @Value("${spring.datasource.hikari.rw-maximum-pool-size}")
    private int readWritePoolSize;

    @Value("${spring.datasource.hikari.ro-maximum-pool-size}")
    private int readOnlyPoolSize;

    @Primary
    @Bean
    @DependsOn({"writeDataSource", "readDataSource", "routingDataSource"})
    public DataSource dataSource() {
        return new LazyConnectionDataSourceProxy(routingDataSource());
    }

    @Bean
    public DataSource routingDataSource() {
        ReplicationRoutingDataSource routingDataSource = new ReplicationRoutingDataSource();

        Map<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put("write", writeDataSource());
        dataSourceMap.put("read", readDataSource());
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(writeDataSource());
        return routingDataSource;
    }

    @Bean(name = "writeDataSource")
    public DataSource writeDataSource() {
        log.info("RW DS URL IS "+readWriteUrl);
        log.info("RW POOL SIZE IS "+readWritePoolSize);
        return this.buildDataSource(
                driverClassName,
                readWriteUrl,
                userName,
                passWord,
                "rw",
                readWritePoolSize
        );
    }

    @Bean(name = "readDataSource")
    public DataSource readDataSource() {
        log.info("RO DS URL IS "+readOnlyUrl);
        log.info("RO POOL SIZE IS "+readOnlyPoolSize);
        return this.buildDataSource(
                driverClassName,
                readOnlyUrl,
                userName,
                passWord,
                "ro",
                readOnlyPoolSize
        );
    }

    private DataSource buildDataSource(
            String driverClassName,
            String jdbcUrl,
            String username,
            String password,
            String poolName,
            int maximumPoolSize
    ) {
        HikariConfig config = new HikariConfig();
        config.setDriverClassName(driverClassName);
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setPoolName(poolName);
        config.setMaximumPoolSize(maximumPoolSize);

        return new HikariDataSource(config);
    }
}
