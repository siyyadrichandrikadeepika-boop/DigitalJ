package Basics;

import java.io.*;
import java.net.*;

public class Server
{
    public static void main(String[] args)
    {
        try
        {
            ServerSocket serverSocket = new ServerSocket(5000);

            System.out.println("Server is waiting for connection...");

            Socket socket = serverSocket.accept();

            System.out.println("Client Connected!");

            DataInputStream dis =
                new DataInputStream(socket.getInputStream());

            DataOutputStream dos =
                new DataOutputStream(socket.getOutputStream());

            String message = dis.readUTF();

            System.out.println("Client: " + message);

            dos.writeUTF("Hello Client!");

            socket.close();
            serverSocket.close();
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }
}