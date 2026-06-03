package Basics;

import java.util.*;

public class NumberGuessing
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        Random rand = new Random();

        int secretNumber = rand.nextInt(100) + 1;

        int guess;

        while(true)
        {
            System.out.print("Enter your guess (1-100): ");
            guess = sc.nextInt();

            if(guess > secretNumber)
            {
                System.out.println("Too High!");
            }
            else if(guess < secretNumber)
            {
                System.out.println("Too Low!");
            }
            else
            {
                System.out.println("Congratulations! You guessed correctly.");
                break;
            }
        }
    }
}