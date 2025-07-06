# Java Programming Cheatsheet

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [Data Types](#data-types)
- [Variables](#variables)
- [Operators](#operators)
- [Control Structures](#control-structures)
- [Methods](#methods)
- [Classes and Objects](#classes-and-objects)
- [Inheritance](#inheritance)
- [Interfaces](#interfaces)
- [Exception Handling](#exception-handling)
- [Collections](#collections)
- [String Manipulation](#string-manipulation)
- [File I/O](#file-io)
- [Common Patterns](#common-patterns)

## Basic Syntax

### Hello World
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Comments
```java
// Single line comment

/*
 * Multi-line comment
 */

/**
 * Javadoc comment
 * @param args command line arguments
 */
```

### Package Declaration
```java
package com.example.myapp;

import java.util.List;
import java.util.ArrayList;
```

## Data Types

### Primitive Types
```java
// Integer types
byte b = 127;           // 8-bit (-128 to 127)
short s = 32767;        // 16-bit (-32,768 to 32,767)
int i = 2147483647;     // 32-bit (-2^31 to 2^31-1)
long l = 9223372036854775807L; // 64-bit (-2^63 to 2^63-1)

// Floating point types
float f = 3.14f;        // 32-bit IEEE 754
double d = 3.14159;     // 64-bit IEEE 754

// Other types
boolean bool = true;    // true or false
char c = 'A';          // 16-bit Unicode character
```

### Reference Types
```java
String str = "Hello World";
int[] array = {1, 2, 3, 4, 5};
List<String> list = new ArrayList<>();
```

## Variables

### Declaration and Initialization
```java
// Declaration
int number;
String name;

// Initialization
number = 42;
name = "John";

// Declaration with initialization
int age = 25;
final double PI = 3.14159; // Constant
```

### Variable Scope
```java
public class ScopeExample {
    private int instanceVar = 10; // Instance variable
    private static int classVar = 20; // Class variable
    
    public void method() {
        int localVar = 30; // Local variable
        
        if (true) {
            int blockVar = 40; // Block variable
        }
        // blockVar not accessible here
    }
}
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

## Control Structures

### If-Else Statements
```java
int score = 85;

if (score >= 90) {
    System.out.println("A grade");
} else if (score >= 80) {
    System.out.println("B grade");
} else if (score >= 70) {
    System.out.println("C grade");
} else {
    System.out.println("F grade");
}

// Ternary operator
String result = (score >= 60) ? "Pass" : "Fail";
```

### Switch Statements
```java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    default:
        dayName = "Invalid day";
        break;
}

// Enhanced switch (Java 14+)
String dayName2 = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Invalid day";
};
```

### Loops

#### For Loop
```java
// Traditional for loop
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// Enhanced for loop (for-each)
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
```

#### While Loop
```java
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
```

#### Do-While Loop
```java
int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 10);
```

### Break and Continue
```java
for (int i = 0; i < 10; i++) {
    if (i == 3) {
        continue; // Skip iteration when i = 3
    }
    if (i == 7) {
        break; // Exit loop when i = 7
    }
    System.out.println(i);
}
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

## Collections

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

## String Manipulation

### String Operations
```java
String str = "Hello World";

// Length and character access
int length = str.length();
char firstChar = str.charAt(0);

// Substring
String sub = str.substring(0, 5); // "Hello"
String sub2 = str.substring(6);   // "World"

// Case conversion
String upper = str.toUpperCase(); // "HELLO WORLD"
String lower = str.toLowerCase(); // "hello world"

// Trimming
String trimmed = "  Hello  ".trim(); // "Hello"

// Replacement
String replaced = str.replace("World", "Java"); // "Hello Java"

// Splitting
String[] words = str.split(" "); // ["Hello", "World"]

// Checking
boolean startsWith = str.startsWith("Hello"); // true
boolean endsWith = str.endsWith("World");     // true
boolean contains = str.contains("llo");       // true
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

### String Formatting
```java
// String.format()
String formatted = String.format("Name: %s, Age: %d, Score: %.2f", 
                                 "Alice", 25, 95.5);

// printf-style
System.out.printf("Name: %s, Age: %d%n", "Bob", 30);

// Text blocks (Java 15+)
String json = """
    {
        "name": "Alice",
        "age": 25,
        "city": "New York"
    }
    """;
```

## File I/O

### Reading Files
```java
import java.io.*;
import java.nio.file.*;
import java.util.List;

// Reading entire file
try {
    String content = Files.readString(Paths.get("file.txt"));
    System.out.println(content);
} catch (IOException e) {
    e.printStackTrace();
}

// Reading lines
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