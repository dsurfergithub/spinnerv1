
import { TaskProvider } from '@/contexts/task-context';
import { SpinnerLogoIcon } from '@/components/icons/spinner-logo-icon';
import { SpinningWheel } from '@/components/spinner-tasker/spinning-wheel';
import { TaskInput } from '@/components/spinner-tasker/task-input';
import { SelectedTaskDisplay } from '@/components/spinner-tasker/selected-task-display';
import { TaskList } from '@/components/spinner-tasker/task-list';
import { CompletedTaskList } from '@/components/spinner-tasker/completed-task-list';
import { ThemeToggleButton } from '@/components/theme-toggle-button';

export default function Home() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:p-8 selection:bg-accent/30">
        <header className="w-full max-w-7xl flex justify-between items-center mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <SpinnerLogoIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">
              Spinner Tasker
            </h1>
          </div>
          <ThemeToggleButton />
        </header>
        <p className="text-md md:text-lg text-muted-foreground -mt-4 md:-mt-8 mb-6 md:mb-10 text-center w-full">¡Deja que la rueda decida tu próxima tarea!</p>


        <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <section className="lg:col-span-2 flex flex-col items-center gap-6 md:gap-8 order-1 lg:order-1">
            <SpinningWheel />
            <SelectedTaskDisplay />
          </section>

          <aside className="lg:col-span-1 flex flex-col gap-6 md:gap-8 order-2 lg:order-2">
            <TaskInput />
            <TaskList />
            <CompletedTaskList />
          </aside>
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Spinner Tasker. ¡Gira hacia la productividad!</p>
        </footer>
      </div>
    </TaskProvider>
  );
}
