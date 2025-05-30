"use client";
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTasks } from '@/contexts/task-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TaskInput() {
  const [taskName, setTaskName] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName);
      setTaskName('');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task description"
            className="flex-grow bg-input placeholder:text-muted-foreground"
            aria-label="New task name"
          />
          <Button type="submit" variant="default" aria-label="Add task">
            <PlusCircle className="mr-2 h-5 w-5" /> Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
