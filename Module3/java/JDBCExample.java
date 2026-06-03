package Basics;

import java.sql.*;

public class JDBCExample
{
    public static void main(String[] args)
    {
        String url = "jdbc:mysql://localhost:3306/studentdb";
        String user = "root";
        String password = "root";

        try
        {
            // Create Connection
            Connection con = DriverManager.getConnection(url, user, password);

            // Create Statement
            Statement stmt = con.createStatement();

            // Execute Query
            ResultSet rs = stmt.executeQuery("SELECT * FROM students");

            // Display Records
            while(rs.next())
            {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");

                System.out.println(
                    "ID: " + id +
                    ", Name: " + name +
                    ", Age: " + age
                );
            }

            // Close Connection
            con.close();
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }
}
