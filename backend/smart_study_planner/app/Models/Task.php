<?php

namespace App\Models;

use App\Priority;
use App\TaskStatus;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // Colunas que podem ser preenchidas via mass assignment
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'priority',
        'user_id',
        'status',
    ];

    // Casts para converter automaticamente tipos do banco
    protected $casts = [
        'priority' => Priority::class,
        'status' => TaskStatus::class,
        'due_date' => 'date',
    ];

    // Relação: cada tarefa pertence a um usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
