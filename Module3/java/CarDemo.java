package Basics;

class Car
{
    String make;
    String model;
    int year;

    void displayDetails()
    {
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println();
    }
}

public class CarDemo
{
    public static void main(String[] args)
    {
        Car car1 = new Car();
        car1.make = "Hyundai";
        car1.model = "i20";
        car1.year = 2022;

        Car car2 = new Car();
        car2.make = "Toyota";
        car2.model = "Innova";
        car2.year = 2024;

        car1.displayDetails();
        car2.displayDetails();
    }
}