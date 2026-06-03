package Basics;

import java.sql.*;

public class TransactionHandling
{
    public static void transfer(int fromId,
                                int toId,
                                double amount)
    {
        String url =
            "jdbc:mysql://localhost:3306/studentdb";

        String user = "root";
        String password = "root";

        try
        {
            Connection con =
                DriverManager.getConnection(
                    url, user, password);

            // Start Transaction
            con.setAutoCommit(false);

            String debitQuery =
                "UPDATE accounts SET balance = balance - ? WHERE id = ?";

            PreparedStatement debit =
                con.prepareStatement(debitQuery);

            debit.setDouble(1, amount);
            debit.setInt(2, fromId);

            int debitRows = debit.executeUpdate();

            String creditQuery =
                "UPDATE accounts SET balance = balance + ? WHERE id = ?";

            PreparedStatement credit =
                con.prepareStatement(creditQuery);

            credit.setDouble(1, amount);
            credit.setInt(2, toId);

            int creditRows = credit.executeUpdate();

            if(debitRows > 0 && creditRows > 0)
            {
                con.commit();
                System.out.println("Transaction Successful");
            }
            else
            {
                con.rollback();
                System.out.println("Transaction Failed");
            }

            con.close();
        }
        catch(Exception e)
        {
            System.out.println("Error: " + e);

            try
            {
                System.out.println("Transaction Rolled Back");
            }
            catch(Exception ex)
            {
                System.out.println(ex);
            }
        }
    }

    public static void main(String[] args)
    {
        transfer(1, 2, 1000);
    }
}