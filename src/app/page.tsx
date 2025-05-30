import { TaskProvider } from '@/contexts/task-context';
import { SpinnerLogoIcon } from '@/components/icons/spinner-logo-icon';
import { SpinningWheel } from '@/components/spinner-tasker/spinning-wheel';
import { TaskInput } from '@/components/spinner-tasker/task-input';
import { SelectedTaskDisplay } from '@/components/spinner-tasker/selected-task-display';
import { TaskList } from '@/components/spinner-tasker/task-list';
import { CompletedTaskList } from '@/components/spinner-tasker/completed-task-list';

export default function Home() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:p-8 selection:bg-accent/30">
        <header className="mb-6 md:mb-10 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <SpinnerLogoIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">
              Spinner Tasker
            </h1>
          </div>
          <p className="text-md md:text-lg text-muted-foreground mt-2">Let the wheel decide your next task!</p>
        </header>

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
          <p>&copy; {new Date().getFullYear()} Spinner Tasker. Spin your way to productivity!</p>
        </footer>
      </div>
    </TaskProvider>
  );
}
