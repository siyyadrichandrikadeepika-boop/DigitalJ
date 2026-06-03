package Basics;

import java.time.Duration;

public class VirtualThreadsExample
{
    public static void main(String[] args) throws Exception
    {
        System.out.println("Starting Virtual Threads...");

        long start = System.currentTimeMillis();

        for(int i = 1; i <= 100000; i++)
        {
            int taskId = i;

            Thread.startVirtualThread(() ->
            {
                System.out.println("Virtual Thread " + taskId);
            });
        }

        long end = System.currentTimeMillis();

        System.out.println("Time taken: " + (end - start) + " ms");

        // small sleep to allow threads to complete
        Thread.sleep(2000);

        System.out.println("Done");
    }
}