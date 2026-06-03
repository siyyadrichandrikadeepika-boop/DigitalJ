package Basics;
import java.util.*;
public class PalindromeChecker
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // Remove non-alphanumeric characters and convert to lowercase
        str = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();

        String rev = "";

        for(int i = str.length() - 1; i >= 0; i--)
        {
            rev = rev + str.charAt(i);
        }

        if(str.equals(rev))
        {
            System.out.println("Palindrome");
        }
        else
        {
            System.out.println("Not a Palindrome");
        }
    }
}