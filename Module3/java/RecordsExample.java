package Basics;

import java.util.*;
import java.util.stream.Collectors;

class Person
{
    String name;
    int age;

    Person(String name, int age)
    {
        this.name = name;
        this.age = age;
    }

    public String toString()
    {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class RecordsExample
{
    public static void main(String[] args)
    {
        Person p1 = new Person("Bhagya", 21);
        Person p2 = new Person("Priya", 17);
        Person p3 = new Person("Anu", 23);

        System.out.println("All Persons:");

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        List<Person> people = Arrays.asList(p1, p2, p3);

        List<Person> adults = people.stream()
                                    .filter(p -> p.age >= 18)
                                    .collect(Collectors.toList());

        System.out.println("\nAdults:");

        adults.forEach(System.out::println);
    }
}