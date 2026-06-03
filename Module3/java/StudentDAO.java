package Basics;

import java.sql.*;

public class StudentDAO
{
    String url = "jdbc:mysql://localhost:3306/studentdb";
    String user = "root";
    String password = "root";

    public void insertStudent(int id, String name, int age)
    {
        try
        {
            Connection con = DriverManager.getConnection(url, user, password);

            String query =
                "INSERT INTO students(id, name, age) VALUES (?, ?, ?)";

            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setInt(3, age);

            int rows = ps.executeUpdate();

            System.out.println(rows + " record inserted.");

            con.close();
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }

    public void updateStudent(int id, String name)
    {
        try
        {
            Connection con = DriverManager.getConnection(url, user, password);

            String query =
                "UPDATE students SET name=? WHERE id=?";

            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, name);
            ps.setInt(2, id);

            int rows = ps.executeUpdate();

            System.out.println(rows + " record updated.");

            con.close();
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }
}