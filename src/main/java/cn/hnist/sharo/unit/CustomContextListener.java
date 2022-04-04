package cn.hnist.sharo.unit;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.sql.DriverManager;
import java.sql.SQLException;

public class CustomContextListener implements ServletContextListener {

    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";

    @Override
    public void contextInitialized(ServletContextEvent arg0) {
        System.out.println(ANSI_GREEN + "webService start" + ANSI_RESET);
    }

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        System.out.println(ANSI_RED + "WebService Stop" + ANSI_RESET);
        try {
            while(DriverManager.getDrivers().hasMoreElements()) {
                DriverManager.deregisterDriver(DriverManager.getDrivers().nextElement());
            }
            System.out.println(ANSI_RED +"JDBC Driver Close"+ ANSI_RESET);
            AbandonedConnectionCleanupThread.checkedShutdown();
            System.out.println(ANSI_RED +"Clean Thread Success"+ ANSI_RESET);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
