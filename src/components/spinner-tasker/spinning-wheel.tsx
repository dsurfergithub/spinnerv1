"use client";
import { useEffect, useState, useRef } from 'react';
import { useTasks } from '@/contexts/task-context';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const WHEEL_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#90EE90', '#FFB6C1', '#D3D3D3', '#ADD8E6', '#FFA07A'];

export function SpinningWheel() {
  const { tasks, spinWheel, selectedTask, isSpinning } = useTasks();
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;

    if (isSpinning) {
      const randomExtraSpins = (3 + Math.floor(Math.random() * 4)) * 360; // 3 to 6 full spins
      const randomOffset = Math.random() * 360;
      setRotation(prev => prev + randomExtraSpins + randomOffset);
    } else if (selectedTask && tasks.length > 0) {
      const taskIndex = tasks.findIndex(t => t.id === selectedTask.id);
      if (taskIndex !== -1) {
        const anglePerSegment = 360 / tasks.length;
        const targetAngleForSegmentMid = -((taskIndex * anglePerSegment) + (anglePerSegment / 2));
        
        const currentFullRotations = Math.floor(rotation / 360);
        let finalRotationValue = (currentFullRotations * 360) + targetAngleForSegmentMid;

        // Ensure it spins forward to the target, or at least doesn't jerk backwards significantly
        const MinSpinsToTarget = 2; // Ensure at least 2 spins forward if needed to reach target smoothly
        while (finalRotationValue < rotation - 180 + (MinSpinsToTarget * 360 * (tasks.length > 1 ? 1: 0)) && tasks.length > 1) {
             finalRotationValue += 360;
        }
         if (tasks.length === 1) { // For a single task, ensure it spins and stops near 0
            finalRotationValue = Math.ceil(rotation / 360) * 360;
        }

        setRotation(finalRotationValue);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning, selectedTask, isClient]); // tasks removed to avoid re-calc if tasks change mid-spin (unlikely)


  const segmentAngle = tasks.length > 0 ? 360 / tasks.length : 360;

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4" data-ai-hint="roulette wheel game">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <div
          className="absolute top-0 left-1/2 z-10"
          style={{ transform: 'translateX(-50%) translateY(-85%)' }}
          aria-hidden="true"
        >
          <svg width="30" height="40" viewBox="0 0 30 40" fill="hsl(var(--accent))" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0L0 20L15 40L30 20L15 0Z" />
          </svg>
        </div>

        <div
          className="w-full h-full rounded-full border-4 border-primary bg-card shadow-2xl overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionProperty: 'transform',
            transitionDuration: isSpinning ? '4s' : '1.5s',
            transitionTimingFunction: isSpinning ? 'cubic-bezier(0.25, 0.1, 0.25, 1)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              const itemRotate = index * segmentAngle;
              // Skew less for more segments to avoid extreme shapes
              const skewValue = tasks.length > 2 ? Math.max(0, Math.min(30, segmentAngle - 60)) : 0; 
              
              let textRotateAdjust = segmentAngle / 2;
              if (tasks.length > 6) textRotateAdjust = segmentAngle > 20 ? 0 : -15;
              else if (tasks.length === 1) textRotateAdjust = 0;


              return (
                <div
                  key={task.id}
                  className="absolute w-1/2 h-1/2 top-0 left-0 origin-bottom-right flex items-center justify-center"
                  style={{
                    transform: `rotate(${itemRotate}deg) skewY(${skewValue}deg)`,
                    background: WHEEL_COLORS[index % WHEEL_COLORS.length],
                     // clipPath for approximate wedge if many segments, else full segment for few
                    clipPath: tasks.length > 1 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%)' : 'none',
                  }}
                >
                  <div
                    style={{
                      transform: `skewY(${-skewValue}deg) rotate(${textRotateAdjust}deg)`,
                      textAlign: 'center',
                      padding: '5px',
                      maxWidth: '80%',
                      color: 'hsl(var(--primary-foreground))',
                    }}
                    className="text-xs md:text-sm font-semibold truncate"
                  >
                    {task.name}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-full bg-muted">
              <p className="text-muted-foreground p-4 text-center">Add tasks to spin the wheel!</p>
            </div>
          )}
        </div>
      </div>
      
      <Button
        onClick={spinWheel}
        disabled={tasks.length === 0 || isSpinning || !isClient}
        size="lg"
        className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-6 text-lg shadow-md transition-transform hover:scale-105 active:scale-95"
        aria-label="Spin the wheel"
      >
        <PlayCircle className="mr-2 h-6 w-6" />
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </Button>
    </div>
  );
}
