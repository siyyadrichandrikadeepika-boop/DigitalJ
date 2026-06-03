package Basics;

public class TypeCasting {
    public static void main(String[] args)
    {
        // Double to Int
        double num1 = 25.75;
        int num2 = (int) num1;
        System.out.println("Double Value: " + num1);
        System.out.println("After Casting to Int: " + num2);
        // Int to Double
        int num3 = 50;
        double num4 = (double) num3;

        System.out.println("Int Value: " + num3);
        System.out.println("After Casting to Double: " + num4);
    }
}

