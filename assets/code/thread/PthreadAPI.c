#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

int sum;
void *runner(void *param);

int main(int args, char *argv[]){
  pthread_t tid[10];
  pthread_attr_t attr[10];

  for(int i = 0; i < 10; i++){
  pthread_attr_init(&attr[i]);
  pthread_create(&tid[i], &attr[i], runner, argv[i + 1]);
  pthread_join(tid[i], NULL);
  }
  printf("sum = %d\n", sum);
}

void *runner(void *param){
  int i, upper = atoi(param);
  printf("start = %d\n", upper);
  for(int i = 1; i <= upper; i++)
    sum += i;
  printf("end = %d\n", upper);
  pthread_exit(0);
}