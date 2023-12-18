package assets.code.thread;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class Summation implements Callable<Integer> {
  private int upper;

  public Summation(int upper) {
    this.upper = upper;
  }

  public Integer call() {
    int sum = 0;
    for (int i = 1; i <= upper; i++)
      sum += i;
    return sum;
  }
}

public class Driver {
  public static void main(String[] args) {
    int upper = Integer.parseInt(args[0]);

    ExecutorService pool = Executors.newSingleThreadExecutor();
    Future<Integer> result = pool.submit(new Summation(upper));

    try {
      System.out.println("sum = " + result.get());
    } catch (InterruptedException | ExecutionException ie) {
    }
    return;
  }
}