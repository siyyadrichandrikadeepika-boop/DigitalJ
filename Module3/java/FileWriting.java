package Basics;

import java.util.*;
import java.io.*;

public class FileWriting
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String text = sc.nextLine();

        try
        {
            FileWriter fw = new FileWriter("output.txt");

            fw.write(text);

            fw.close();

            System.out.println("Data has been written to output.txt");
        }
        catch(IOException e)
        {
            System.out.println("Error writing to file.");
        }
    }
}