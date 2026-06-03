package Basics;

import java.io.*;
import java.net.*;

public class Client
{
    public static void main(String[] args)
    {
        try
        {
            Socket socket =
                new Socket("localhost", 5000);

            DataInputStream dis =
                new DataInputStream(socket.getInputStream());

            DataOutputStream dos =
                new DataOutputStream(socket.getOutputStream());

            dos.writeUTF("Hello Server!");

            String response = dis.readUTF();

            System.out.println("Server: " + response);

            socket.close();
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }
}