package Basics;

import java.util.*;

// Custom Exception Class
class InvalidAgeException extends Exception
{
    InvalidAgeException(String message)
    {
        super(message);
    }
}

public class CustomExceptionDemo
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        try
        {
            if(age < 18)
            {
                throw new InvalidAgeException("Age must be 18 or above.");
            }

            System.out.println("Eligible");
        }
        catch(InvalidAgeException e)
        {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}