<?php

namespace App;

enum TaskStatus: string
{
    case NaoConcluida = 'nao_concluida';
    case EmAndamento = 'em_andamento';
    case Concluida = 'concluida';
}
