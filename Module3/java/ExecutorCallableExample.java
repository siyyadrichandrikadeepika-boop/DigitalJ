package Basics;

import java.util.concurrent.*;

public class ExecutorCallableExample
{
    public static void main(String[] args)
    {
        // Create thread pool
        ExecutorService executor =
            Executors.newFixedThreadPool(3);

        try
        {
            // Submit Callable tasks
            Future<Integer> f1 =
                executor.submit(new Task(10));

            Future<Integer> f2 =
                executor.submit(new Task(20));

            Future<Integer> f3 =
                executor.submit(new Task(30));

            // Get results
            System.out.println("Result 1: " + f1.get());
            System.out.println("Result 2: " + f2.get());
            System.out.println("Result 3: " + f3.get());
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
        finally
        {
            executor.shutdown();
        }
    }
}

// Callable Task
class Task implements Callable<Integer>
{
    int value;

    Task(int value)
    {
        this.value = value;
    }

    @Override
    public Integer call()
    {
        return value * value; // square calculation
    }
}