package Basics;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectionExample
{
    public void sayHello()
    {
        System.out.println("Hello Bhagi!");
    }

    public void add(int a, int b)
    {
        System.out.println("Sum: " + (a + b));
    }

    public static void main(String[] args)
    {
        try
        {
            // Load class dynamically
            Class<?> cls = Class.forName("Basics.ReflectionExample");

            // Create object
            Object obj = cls.getDeclaredConstructor().newInstance();

            // Get all methods
            Method[] methods = cls.getDeclaredMethods();

            System.out.println("Methods in class:");

            for(Method method : methods)
            {
                System.out.println("Method Name: " + method.getName());

                // Print parameters
                Parameter[] params = method.getParameters();

                System.out.print("Parameters: ");

                if(params.length == 0)
                {
                    System.out.print("None");
                }
                else
                {
                    for(Parameter p : params)
                    {
                        System.out.print(p.getType().getSimpleName()
                                         + " "
                                         + p.getName() + " ");
                    }
                }

                System.out.println("\n-------------------");
            }

            // Invoke methods dynamically
            Method m1 = cls.getDeclaredMethod("sayHello");
            m1.invoke(obj);

            Method m2 = cls.getDeclaredMethod("add", int.class, int.class);
            m2.invoke(obj, 10, 20);

        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }
}

