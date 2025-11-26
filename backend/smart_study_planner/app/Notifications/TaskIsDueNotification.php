<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskIsDueNotification extends Notification
{
    use Queueable;

    public $task;

    /**
     * Create a new notification instance.
     */
    public function __construct($task)
    {
        $this->task = $task;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Sua tarefa vence hoje')
            ->greeting('Olá, ' . $notifiable->name . '!')
            ->line('Sua tarefa "' . $this->task->title . '" está vencendo hoje. Não esqueça de concluir.')
            ->line('Mas não se preocupa, vai dar tudo certo!')
            ->action('Clique aqui e confira', url('http://localhost:3000/tasks'))
            ->salutation('Atenciosamente, Equipe SmartStudy Planner');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
