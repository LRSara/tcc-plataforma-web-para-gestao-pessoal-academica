<?php

namespace App\Jobs;

use App\Models\Task;
use App\Notifications\TaskIsDueNotification;
use App\TaskStatus;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class NotifyDueTasksJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $tarefas = Task::whereDate('due_date', today())->get();

        foreach ($tarefas as $tarefa) {
            if ($tarefa->status === TaskStatus::NaoConcluida)
            {
                $tarefa->user->notify(new TaskIsDueNotification($tarefa));
            }
        }
    }
}
