<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    // Colunas que podem ser preenchidas via mass assignment
    protected $fillable = [
        'title',
        'content',
        'subject_id',
        'is_favorite',
        'user_id',
    ];

    // Relação: uma nota pertence a um usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relação: uma nota pertence a uma disciplina
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
