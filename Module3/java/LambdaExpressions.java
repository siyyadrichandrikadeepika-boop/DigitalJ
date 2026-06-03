package Basics;

import java.util.*;

public class LambdaExpressions
{
    public static void main(String[] args)
    {
        List<String> names = new ArrayList<>();

        names.add("Bhagya");
        names.add("Anu");
        names.add("Priya");
        names.add("Divya");

        Collections.sort(names, (a, b) -> a.compareTo(b));

        System.out.println("Sorted List:");

        for(String name : names)
        {
            System.out.println(name);
        }
    }
}