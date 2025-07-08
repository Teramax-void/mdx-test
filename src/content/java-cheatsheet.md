# Java Programming Cheatsheet

## Getting Started

### Hello World
```java
public class Hello {
  // main method
  public static void main(String[] args)
  {
    // Output: Hello, world!
    System.out.println("Hello, world!");
  }
}
```

Compiling and running:
```bash
$ javac Hello.java
$ java Hello
Hello, world!
```

### Variables
```java
int num = 5;
float floatNum = 5.99f;
char letter = 'D';
boolean bool = true;
String site = "quickref.me";
```

### Primitive Data Types
```java
byte    // 1 byte  | 0        | -128 to 127
short   // 2 byte  | 0        | -2^15 to 2^15-1
int     // 4 byte  | 0        | -2^31 to 2^31-1
long    // 8 byte  | 0        | -2^63 to 2^63-1
float   // 4 byte  | 0.0f     | N/A
double  // 8 byte  | 0.0d     | N/A
char    // 2 byte  | \u0000   | 0 to 65535
boolean // N/A     | false    | true / false
```

### Type Casting
```java
// Widening
// byte<short<int<long<float<double
int i = 10;
long l = i;               // 10

// Narrowing
double d = 10.02;
long l = (long)d;         // 10

String.valueOf(10);       // "10"
Integer.parseInt("10");   // 10
Double.parseDouble("10"); // 10.0
```

### User Input
```java
Scanner in = new Scanner(System.in);
String str = in.nextLine();
System.out.println(str);

int num = in.nextInt();
System.out.println(num);
```

### Swap Variables
```java
int a = 1;
int b = 2;
System.out.println(a + " " + b); // 1 2

int temp = a;
a = b;
b = temp;
System.out.println(a + " " + b); // 2 1
```

## Strings

### String Basics
```java
String str1 = "value";
String str2 = new String("value");
String str3 = String.valueOf(123);
```

### String Concatenation
```java
String s = 3 + "str" + 3;     // 3str3
String s = 3 + 3 + "str";     // 6str
String s = "3" + 3 + "str";   // 33str
String s = "3" + "3" + "23";  // 3323
String s = "" + 3 + 3 + "23"; // 3323
```

### StringBuilder
```java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");

String result = sb.toString(); // "Hello World"

// More efficient for multiple concatenations
StringBuilder builder = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    builder.append("Number: ").append(i).append("\n");
}
String longString = builder.toString();
```

### String Comparison
```java
String s1 = new String("cheatsheets.zip");
String s2 = new String("cheatsheets.zip");

s1 == s2          // false
s1.equals(s2)     // true

"AB".equalsIgnoreCase("ab")  // true
```

### String Manipulation
```java
String str = "Abcd";

str.toUpperCase();     // ABCD
str.toLowerCase();     // abcd
str.concat("#");       // Abcd#
str.replace("b", "-"); // A-cd

"  abc ".trim();       // abc
"ab".toCharArray();    // {'a', 'b'}
```

### String Information
```java
String str = "abcd";

str.charAt(2);       // c
str.indexOf("a")     // 0
str.indexOf("z")     // -1
str.length();        // 4
str.toString();      // abcd
str.substring(2);    // cd
str.substring(2,3);  // c
str.contains("c");   // true
str.endsWith("d");   // true
str.startsWith("a"); // true
str.isEmpty();       // false
```

### String Immutability
```java
String str = "hello";
str.concat("world");

// Outputs: hello
System.out.println(str);

// Correct way:
String str = "hello";
String concat = str.concat("world");

// Outputs: helloworld
System.out.println(concat);
```

## Arrays

### Array Declaration
```java
int[] a1;
int[] a2 = {1, 2, 3};
int[] a3 = new int[]{1, 2, 3};

int[] a4 = new int[3];
a4[0] = 1;
a4[1] = 2;
a4[2] = 3;
```

### Array Operations
```java
int[] a = {1, 2, 3};
System.out.println(a[0]); // 1

a[0] = 9;
System.out.println(a[0]); // 9

System.out.println(a.length); // 3
```

### Array Loops
```java
// Loop (Read & Modify)
int[] arr = {1, 2, 3};
for (int i=0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
    System.out.print(arr[i] + " ");
}
// Outputs: 2 4 6

// Enhanced for loop (Read only)
String[] arr = {"a", "b", "c"};
for (String a: arr) {
    System.out.print(a + " ");
}
// Outputs: a b c
```

### Multidimensional Arrays
```java
int[][] matrix = { {1, 2, 3}, {4, 5} };

int x = matrix[1][0];  // 4
// [[1, 2, 3], [4, 5]]
Arrays.deepToString(matrix);

for (int i = 0; i < matrix.length; ++i) {
  for(int j = 0; j < matrix[i].length; ++j) {
    System.out.println(matrix[i][j]);
  }
}
// Outputs: 1 2 3 4 5
```

### Array Sorting
```java
char[] chars = {'b', 'a', 'c'};
Arrays.sort(chars);

// [a, b, c]
Arrays.toString(chars);
```

## Control Structures

### If-Else Statements
```java
int k = 15;
if (k > 20) {
  System.out.println(1);
} else if (k > 10) {
  System.out.println(2);
} else {
  System.out.println(3);
}
```

### Switch Statements
```java
int month = 3;
String str;
switch (month) {
  case 1:
    str = "January";
    break;
  case 2:
    str = "February";
    break;
  case 3:
    str = "March";
    break;
  default:
    str = "Some other month";
    break;
}

// Outputs: Result March
System.out.println("Result " + str);
```

### Ternary Operator
```java
int a = 10;
int b = 20;
int max = (a > b) ? a : b;

// Outputs: 20
System.out.println(max);
```

## Loops

### For Loop
```java
for (int i = 0; i < 10; i++) {
  System.out.print(i);
}
// Outputs: 0123456789

// Multiple variables
for (int i = 0,j = 0; i < 3; i++,j--) {
  System.out.print(j + "|" + i + " ");
}
// Outputs: 0|0 -1|1 -2|2
```

### Enhanced For Loop
```java
int[] numbers = {1,2,3,4,5};

for (int number: numbers) {
  System.out.print(number);
}
// Outputs: 12345

String word = "CheatSheets";
for (char c: word.toCharArray()) {
  System.out.print(c + "-");
}
// Outputs: C-h-e-a-t-S-h-e-e-t-s-
```

### While Loop
```java
int count = 0;

while (count < 5) {
  System.out.print(count);
  count++;
}
// Outputs: 01234
```

### Do-While Loop
```java
int count = 0;

do {
  System.out.print(count);
  count++;
} while (count < 5);
// Outputs: 01234
```

### Break and Continue
```java
// Continue Statement
for (int i = 0; i < 5; i++) {
  if (i == 3) {
    continue;
  }
  System.out.print(i);
}
// Outputs: 0124

// Break Statement
for (int i = 0; i < 5; i++) {
  System.out.print(i);
  if (i == 3) {
    break;
  }
}
// Outputs: 0123
```

## Methods

### Method Declaration
```java
public class Calculator {
    // Method with return value
    public int add(int a, int b) {
        return a + b;
    }
    
    // Method without return value (void)
    public void printResult(int result) {
        System.out.println("Result: " + result);
    }
    
    // Static method
    public static double calculateArea(double radius) {
        return Math.PI * radius * radius;
    }
    
    // Method with variable arguments
    public int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
}
```

### Method Overloading
```java
public class MathUtils {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

## Classes and Objects

### Class Definition
```java
public class Person {
    // Instance variables (fields)
    private String name;
    private int age;
    private static int personCount = 0; // Class variable
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        personCount++;
    }
    
    // Default constructor
    public Person() {
        this("Unknown", 0);
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
    
    // Instance method
    public void introduce() {
        System.out.println("Hi, I'm " + name + " and I'm " + age + " years old.");
    }
    
    // Static method
    public static int getPersonCount() {
        return personCount;
    }
    
    // toString method
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
```

### Object Creation and Usage
```java
// Creating objects
Person person1 = new Person("Alice", 25);
Person person2 = new Person("Bob", 30);

// Using object methods
person1.introduce();
person1.setAge(26);

// Accessing static members
int totalPersons = Person.getPersonCount();
```

## Inheritance

### Basic Inheritance
```java
// Parent class
public class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void eat() {
        System.out.println(name + " is eating.");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping.");
    }
}

// Child class
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking.");
    }
    
    @Override
    public void eat() {
        System.out.println(name + " the dog is eating dog food.");
    }
}
```

### Abstract Classes
```java
public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method
    public abstract double calculateArea();
    
    // Concrete method
    public void displayColor() {
        System.out.println("Color: " + color);
    }
}

public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```

## Interfaces

### Interface Definition
```java
public interface Drawable {
    // Constants (public, static, final by default)
    int MAX_SIZE = 100;
    
    // Abstract methods (public by default)
    void draw();
    void resize(int width, int height);
    
    // Default method (Java 8+)
    default void display() {
        System.out.println("Displaying the drawable object");
    }
    
    // Static method (Java 8+)
    static void printInfo() {
        System.out.println("This is a drawable interface");
    }
}

// Implementation
public class Rectangle implements Drawable {
    private int width, height;
    
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
    
    @Override
    public void resize(int width, int height) {
        this.width = width;
        this.height = height;
    }
}
```

### Multiple Interface Implementation
```java
public interface Flyable {
    void fly();
}

public interface Swimmable {
    void swim();
}

public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}
```

## Exception Handling

### Try-Catch-Finally
```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        } finally {
            System.out.println("This always executes");
        }
    }
    
    public static int divide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}
```

### Custom Exceptions
```java
public class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class Person {
    private int age;
    
    public void setAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Age must be between 0 and 150");
        }
        this.age = age;
    }
}
```

### Try-with-Resources
```java
import java.io.*;

public class FileExample {
    public static void readFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
        // Reader is automatically closed
    }
}
```

## Collections Framework

### ArrayList
```java
import java.util.*;

List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");

// Access elements
String first = list.get(0);
int size = list.size();

// Iterate
for (String fruit : list) {
    System.out.println(fruit);
}

// Remove elements
list.remove("Banana");
list.remove(0);
```

### HashMap
```java
import java.util.*;

Map<String, Integer> map = new HashMap<>();
map.put("Alice", 25);
map.put("Bob", 30);
map.put("Charlie", 35);

// Access values
Integer age = map.get("Alice");
boolean hasKey = map.containsKey("Bob");

// Iterate
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Java 8+ forEach
map.forEach((name, age) -> System.out.println(name + ": " + age));
```

### HashSet
```java
import java.util.*;

Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple"); // Duplicate, won't be added

boolean contains = set.contains("Apple");
int size = set.size(); // 2

for (String item : set) {
    System.out.println(item);
}
```

### ArrayDeque
```java
Deque<String> a = new ArrayDeque<>();

// Using add()
a.add("Dog");

// Using addFirst()
a.addFirst("Cat");

// Using addLast()
a.addLast("Horse");

// [Cat, Dog, Horse]
System.out.println(a);

// Access element
System.out.println(a.peek());

// Remove element
System.out.println(a.pop());
```

## Operators

### Arithmetic Operators
```java
int a = 10, b = 3;

int sum = a + b;        // Addition: 13
int diff = a - b;       // Subtraction: 7
int product = a * b;    // Multiplication: 30
int quotient = a / b;   // Division: 3
int remainder = a % b;  // Modulus: 1

// Increment/Decrement
a++;    // Post-increment
++a;    // Pre-increment
b--;    // Post-decrement
--b;    // Pre-decrement
```

### Comparison Operators
```java
int x = 5, y = 10;

boolean equal = (x == y);       // false
boolean notEqual = (x != y);    // true
boolean greater = (x > y);      // false
boolean less = (x < y);         // true
boolean greaterEqual = (x >= y); // false
boolean lessEqual = (x <= y);   // true
```

### Logical Operators
```java
boolean a = true, b = false;

boolean and = a && b;   // Logical AND: false
boolean or = a || b;    // Logical OR: true
boolean not = !a;       // Logical NOT: false
```

### Assignment Operators
```java
int x = 10;

x += 5;  // x = x + 5;  (15)
x -= 3;  // x = x - 3;  (12)
x *= 2;  // x = x * 2;  (24)
x /= 4;  // x = x / 4;  (6)
x %= 5;  // x = x % 5;  (1)
```

## Access Modifiers

### Visibility Table
```java
// Modifier    | Class | Package | Subclass | World
// public      |   Y   |    Y    |    Y     |   Y
// protected   |   Y   |    Y    |    Y     |   N
// no modifier |   Y   |    Y    |    N     |   N
// private     |   Y   |    N    |    N     |   N
```

### Example Usage
```java
public class AccessExample {
    public String publicVar = "Everyone can see this";
    protected String protectedVar = "Subclasses and package can see this";
    String packageVar = "Only package can see this";
    private String privateVar = "Only this class can see this";
    
    public void publicMethod() {
        // Accessible from anywhere
    }
    
    protected void protectedMethod() {
        // Accessible from subclasses and same package
    }
    
    void packageMethod() {
        // Accessible from same package only
    }
    
    private void privateMethod() {
        // Accessible from this class only
    }
}
```

## Math Methods

### Common Math Operations
```java
// Basic operations
Math.max(a, b);         // Maximum of a and b
Math.min(a, b);         // Minimum of a and b
Math.abs(a);            // Absolute value of a
Math.sqrt(a);           // Square root of a
Math.pow(a, b);         // a raised to power b
Math.round(a);          // Closest integer to a

// Trigonometric functions
Math.sin(angle);        // Sine of angle (in radians)
Math.cos(angle);        // Cosine of angle
Math.tan(angle);        // Tangent of angle
Math.asin(value);       // Inverse sine
Math.acos(value);       // Inverse cosine
Math.atan(value);       // Inverse tangent

// Logarithmic functions
Math.log(a);            // Natural logarithm of a
Math.log10(a);          // Base-10 logarithm of a

// Angle conversion
Math.toDegrees(radians); // Convert radians to degrees
Math.toRadians(degrees); // Convert degrees to radians

// Constants
Math.PI;                // π (pi)
Math.E;                 // e (Euler's number)
```

## Regular Expressions

### Basic Pattern Matching
```java
String text = "I am learning Java";

// Removing all whitespace
text.replaceAll("\\s+", "");

// Splitting a string
String[] parts = text.split("\\s+");  // Split by whitespace
String[] parts2 = text.split("\\|");  // Split by pipe character

// Using Pattern.quote for literal strings
String[] parts3 = text.split(Pattern.quote("|"));
```

### Pattern Validation
```java
import java.util.regex.Pattern;

// Email validation
String email = "user@example.com";
boolean isValidEmail = Pattern.matches("^[A-Za-z0-9+_.-]+@(.+)$", email);

// Phone number validation
String phone = "123-456-7890";
boolean isValidPhone = Pattern.matches("\\d{3}-\\d{3}-\\d{4}", phone);

// Check if string contains only digits
String number = "12345";
boolean isNumeric = Pattern.matches("\\d+", number);
```

## Comments and Documentation

### Comment Types
```java
// Single line comment

/*
 * Multi-line comment
 * Can span multiple lines
 */

/**
 * Javadoc comment for documentation
 * @param args command line arguments
 * @return description of return value
 * @throws Exception description of exception
 * @author Your Name
 * @version 1.0
 * @since 1.0
 */
public static void main(String[] args) throws Exception {
    // Method implementation
}
```

## Keywords

### Reserved Keywords
```java
// Control flow
if, else, switch, case, default, for, while, do, break, continue, return

// Class and method modifiers
public, private, protected, static, final, abstract, synchronized, native, strictfp, transient, volatile

// Class-related
class, interface, extends, implements, super, this, new, instanceof

// Data types
boolean, byte, char, short, int, long, float, double, void

// Exception handling
try, catch, finally, throw, throws

// Package and import
package, import

// Other
assert, enum, const, goto (reserved but not used)
```

## File I/O

### Reading Files
```java
import java.io.*;
import java.nio.file.*;
import java.util.List;

// Reading entire file as string
try {
    String content = Files.readString(Paths.get("file.txt"));
    System.out.println(content);
} catch (IOException e) {
    e.printStackTrace();
}

// Reading all lines
try {
    List<String> lines = Files.readAllLines(Paths.get("file.txt"));
    for (String line : lines) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// Reading with BufferedReader
try (BufferedReader reader = Files.newBufferedReader(Paths.get("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### Writing Files
```java
import java.io.*;
import java.nio.file.*;
import java.util.Arrays;

// Writing string to file
try {
    Files.writeString(Paths.get("output.txt"), "Hello World");
} catch (IOException e) {
    e.printStackTrace();
}

// Writing lines
List<String> lines = Arrays.asList("Line 1", "Line 2", "Line 3");
try {
    Files.write(Paths.get("output.txt"), lines);
} catch (IOException e) {
    e.printStackTrace();
}

// Writing with BufferedWriter
try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("output.txt"))) {
    writer.write("Hello");
    writer.newLine();
    writer.write("World");
} catch (IOException e) {
    e.printStackTrace();
}
```

## Common Patterns

### Singleton Pattern
```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {
        // Private constructor
    }
    
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// Thread-safe lazy initialization
public class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {}
    
    public static ThreadSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

### Builder Pattern
```java
public class Person {
    private final String name;
    private final int age;
    private final String email;
    private final String phone;
    
    private Person(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
        this.phone = builder.phone;
    }
    
    public static class Builder {
        private String name;
        private int age;
        private String email;
        private String phone;
        
        public Builder setName(String name) {
            this.name = name;
            return this;
        }
        
        public Builder setAge(int age) {
            this.age = age;
            return this;
        }
        
        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }
        
        public Builder setPhone(String phone) {
            this.phone = phone;
            return this;
        }
        
        public Person build() {
            return new Person(this);
        }
    }
}

// Usage
Person person = new Person.Builder()
    .setName("Alice")
    .setAge(25)
    .setEmail("alice@example.com")
    .build();
```

### Observer Pattern
```java
import java.util.*;

interface Observer {
    void update(String message);
}

class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void addObserver(Observer observer) {
        observers.add(observer);
    }
    
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}

class ConcreteObserver implements Observer {
    private String name;
    
    public ConcreteObserver(String name) {
        this.name = name;
    }
    
    @Override
    public void update(String message) {
        System.out.println(name + " received: " + message);
    }
}
```

### Lambda Expressions (Java 8+)
```java
import java.util.*;
import java.util.stream.*;

// Basic lambda syntax
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Traditional approach
names.forEach(new Consumer<String>() {
    @Override
    public void accept(String name) {
        System.out.println(name);
    }
});

// Lambda expression
names.forEach(name -> System.out.println(name));

// Method reference
names.forEach(System.out::println);

// Stream operations
List<String> filteredNames = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Sorting with lambda
names.sort((a, b) -> a.compareTo(b));
names.sort(String::compareTo);
```

---

*This cheatsheet covers the essential Java programming concepts. For more advanced topics, refer to the official Java documentation.*