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
          <CardTitle className="font-headline text-2xl text-accent">Girando...</CardTitle>
        </CardHeader>
        <CardContent>
          <RotateCw className="h-16 w-16 mx-auto text-accent animate-spin" data-ai-hint="loader spin" />
          <CardDescription className="mt-4 text-lg">¡Veamos qué decide el destino!</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (!selectedTask) {
    const messageCardContent = tasks.length > 0 ? (
      <>
        <CardTitle className="font-headline text-2xl">¿Listo para Girar?</CardTitle>
        <CardDescription className="text-lg">¡Haz clic en el botón "¡Girar la Rueda!" para seleccionar tu próxima tarea.</CardDescription>
      </>
    ) : (
      <>
        <CardTitle className="font-headline text-2xl">Añade Tareas para Girar</CardTitle>
        <CardDescription className="text-lg">¡Añade algunas tareas usando el campo de entrada, luego gira la rueda!</CardDescription>
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
        <CardDescription className="text-md">¡Esta es tu tarea elegida!</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">¿Qué harás?</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button
          onClick={() => {
            markTaskAsComplete(selectedTask.id);
          }}
          className="bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
          aria-label={`Marcar ${selectedTask.name} como completa`}
        >
          <CheckCircle2 className="mr-2 h-5 w-5" /> Marcar como Completa
        </Button>
        <Button variant="outline" onClick={clearSelectedTask} aria-label="Elige otra tarea o gira de nuevo">
          Borrar Selección
        </Button>
      </CardFooter>
    </Card>
  );
}
