package Basics;

import java.util.*;

public class RecursiveFibonacci
{
    static int fibonacci(int n)
    {
        if(n == 0)
        {
            return 0;
        }
        else if(n == 1)
        {
            return 1;
        }
        else
        {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }

    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a positive integer: ");
        int n = sc.nextInt();

        System.out.println("The " + n + "th Fibonacci number is: " + fibonacci(n));
    }
}