
"use client";
import { CheckCircle2, Trash2 } from 'lucide-react';
import type { Task } from '@/contexts/task-context';
import { useTasks } from '@/contexts/task-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskItemProps {
  task: Task;
  isCompletedList?: boolean;
}

export function TaskItem({ task, isCompletedList = false }: TaskItemProps) {
  const { markTaskAsComplete, deleteTask } = useTasks();

  return (
    <li className={cn(
      "flex items-center justify-between p-3 rounded-md transition-colors",
      isCompletedList ? "bg-muted/50 text-muted-foreground line-through" : "bg-card hover:bg-secondary"
    )}>
      <span className="truncate mr-2 flex-1" title={task.name}>{task.name}</span>
      <div className="flex items-center gap-1">
        {!isCompletedList && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => markTaskAsComplete(task.id)}
              aria-label={`Marcar ${task.name} como completa`}
              className="text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:text-green-500 dark:hover:bg-green-900/50"
            >
              <CheckCircle2 className="h-5 w-5" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Borrar tarea ${task.name}`}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-500 dark:hover:bg-red-900/50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto borrará permanentemente la tarea "{task.name}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteTask(task.id)}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  >
                    Borrar Tarea
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </li>
  );
}
