package Basics;

public class OperatorPrecedence {
    public static void main(String[] args)
    {
        int result1 = 10 + 5 * 2;
        int result2 = (10 + 5) * 2;
        int result3 = 20 / 5 + 3 * 4;
        int result4 = 50 - 10 / 2;
        System.out.println("10 + 5 * 2 = " + result1);
        System.out.println("(10 + 5) * 2 = " + result2);
        System.out.println("20 / 5 + 3 * 4 = " + result3);
        System.out.println("50 - 10 / 2 = " + result4);
    }
}

