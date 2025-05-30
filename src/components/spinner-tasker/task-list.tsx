
"use client";
import { useTasks } from '@/contexts/task-context';
import { TaskItem } from './task-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TaskList() {
  const { tasks } = useTasks();

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Lista de Tareas</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Aún no hay tareas añadidas. ¡Añade algunas tareas para empezar!</p>
        ) : (
          <ScrollArea className="h-[200px] pr-1"> {/* Reduced pr slightly */}
            <ul className="space-y-2">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

