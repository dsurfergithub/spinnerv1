"use client";
import { CheckCircle2 } from 'lucide-react';
import type { Task } from '@/contexts/task-context';
import { useTasks } from '@/contexts/task-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  isCompletedList?: boolean;
}

export function TaskItem({ task, isCompletedList = false }: TaskItemProps) {
  const { markTaskAsComplete } = useTasks();

  return (
    <li className={cn(
      "flex items-center justify-between p-3 rounded-md transition-colors",
      isCompletedList ? "bg-muted/50 text-muted-foreground line-through" : "bg-card hover:bg-secondary"
    )}>
      <span className="truncate mr-2 flex-1" title={task.name}>{task.name}</span>
      {!isCompletedList && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => markTaskAsComplete(task.id)}
          aria-label={`Mark ${task.name} as complete`}
          className="text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:text-green-500 dark:hover:bg-green-900/50"
        >
          <CheckCircle2 className="h-5 w-5" />
        </Button>
      )}
    </li>
  );
}
