package com.playspot.metrics;

import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class DatabaseHealthMetric {

    private final AtomicInteger dbUp = new AtomicInteger(0);

    @Autowired
    public DatabaseHealthMetric(MeterRegistry registry, DataSource dataSource) {
        Gauge.builder("playspot_db_up", dbUp, AtomicInteger::get)
                .description("1 when DB is reachable, 0 otherwise")
                .register(registry);

        this.dataSource = dataSource;
        // Initial check
        checkDb();
    }

    private final DataSource dataSource;

    @Scheduled(fixedDelayString = "PT30S") // every 30 seconds
    public void scheduledDbCheck() {
        checkDb();
    }

    private void checkDb() {
        try (Connection conn = dataSource.getConnection()) {
            if (conn != null && !conn.isClosed()) {
                dbUp.set(1);
                return;
            }
        } catch (Exception e) {
            // ignore
        }
        dbUp.set(0);
    }
}
