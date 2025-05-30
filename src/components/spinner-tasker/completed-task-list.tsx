
"use client";
import { useTasks } from '@/contexts/task-context';
import { TaskItem } from './task-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CompletedTaskList() {
  const { completedTasks } = useTasks();

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Tareas Completadas</CardTitle>
      </CardHeader>
      <CardContent>
        {completedTasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Aún no hay tareas completadas.</p>
        ) : (
          <ScrollArea className="h-[200px] pr-1"> {/* Reduced pr slightly */}
            <ul className="space-y-2">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} isCompletedList={true} />
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
