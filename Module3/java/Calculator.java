package Basics;

import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.err.println("Enter first number: ");
         int num1=sc.nextInt();
         System.err.println("Enter second number: ");
         int num2=sc.nextInt();
         System.out.println("1. Addition");
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Division");
        int choice=sc.nextInt();
        if(choice==1)
        {
            System.out.println(num1+num2);
        }
        else if(choice==2)
        {
            System.out.println(num1-num2);
        }
        else if(choice==3)
        {
            System.out.println(num1*num2);
        }
        else if(choice==4)
        {
            System.out.println(num1/num2);
        }
        else
        {
            System.out.println("Invalid choice");
        }
    }
}
