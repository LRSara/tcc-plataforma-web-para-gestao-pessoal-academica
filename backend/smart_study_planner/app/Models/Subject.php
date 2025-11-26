<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        'name',
        'user_id'
    ];

    // Um assunto pode ter vários resumos
    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    // Relação: cada subject pertence a um usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
