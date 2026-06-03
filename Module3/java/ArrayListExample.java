package Basics;

import java.util.*;

public class ArrayListExample
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        ArrayList<String> names = new ArrayList<>();

        System.out.print("Enter number of students: ");
        int n = sc.nextInt();
        sc.nextLine(); // consume newline

        for(int i = 1; i <= n; i++)
        {
            System.out.print("Enter name " + i + ": ");
            String name = sc.nextLine();

            names.add(name);
        }

        System.out.println("\nStudent Names:");

        for(String name : names)
        {
            System.out.println(name);
        }
    }
}