package Basics;

public class PatternMatchingSwitch
{
    public static void checkType(Object obj)
    {
        if(obj instanceof Integer)
        {
            System.out.println(obj + " is an Integer");
        }
        else if(obj instanceof String)
        {
            System.out.println(obj + " is a String");
        }
        else if(obj instanceof Double)
        {
            System.out.println(obj + " is a Double");
        }
        else if(obj instanceof Boolean)
        {
            System.out.println(obj + " is a Boolean");
        }
        else
        {
            System.out.println("Unknown Type");
        }
    }

    public static void main(String[] args)
    {
        checkType(100);
        checkType("Bhagya");
        checkType(99.5);
        checkType(true);
    }
}