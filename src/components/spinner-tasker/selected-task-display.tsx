"use client";
import { useTasks } from '@/contexts/task-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, RotateCw } from 'lucide-react';

export function SelectedTaskDisplay() {
  const { selectedTask, markTaskAsComplete, clearSelectedTask, isSpinning, tasks } = useTasks();

  if (isSpinning) {
    return (
      <Card className="w-full max-w-md text-center shadow-xl border-accent border-2 animate-pulse" aria-live="assertive">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">Spinning...</CardTitle>
        </CardHeader>
        <CardContent>
          <RotateCw className="h-16 w-16 mx-auto text-accent animate-spin" data-ai-hint="loader spin" />
          <CardDescription className="mt-4 text-lg">Let's see what fate decides!</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (!selectedTask) {
    const messageCardContent = tasks.length > 0 ? (
      <>
        <CardTitle className="font-headline text-2xl">Ready to Spin?</CardTitle>
        <CardDescription className="text-lg">Click the "Spin the Wheel!" button to select your next task.</CardDescription>
      </>
    ) : (
      <>
        <CardTitle className="font-headline text-2xl">Add Tasks to Spin</CardTitle>
        <CardDescription className="text-lg">Add some tasks using the input field, then spin the wheel!</CardDescription>
      </>
    );
    return (
        <Card className="w-full max-w-md text-center shadow-lg" aria-live="polite">
            <CardHeader>{messageCardContent}</CardHeader>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-md text-center shadow-xl border-primary border-2" aria-live="assertive">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">{selectedTask.name}</CardTitle>
        <CardDescription className="text-md">This is your chosen task!</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">What will you do?</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button
          onClick={() => {
            markTaskAsComplete(selectedTask.id);
          }}
          className="bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
          aria-label={`Mark ${selectedTask.name} as complete`}
        >
          <CheckCircle2 className="mr-2 h-5 w-5" /> Mark as Complete
        </Button>
        <Button variant="outline" onClick={clearSelectedTask} aria-label="Choose another task or spin again">
          Clear Selection
        </Button>
      </CardFooter>
    </Card>
  );
}
