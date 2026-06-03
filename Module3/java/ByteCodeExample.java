package Basics;

public class ByteCodeExample
{
    public void greet()
    {
        System.out.println("Hello Bhagi!");
    }

    public static void main(String[] args)
    {
        ByteCodeExample obj = new ByteCodeExample();
        obj.greet();
    }
}