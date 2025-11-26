<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    public function index(Request $request)
    {
        return Task::where('user_id', $request->user()->id)->get();
    }

    public function show(Task $task)
    {
        if (!$task) {
            return response()->json(['error' => 'Task não encontrada'], 404);
        }
        return $task;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:nao_concluida,concluida,em_andamento',
        ]);

        $task = Task::findOrFail($id);

        $atualizado = $task->update([
            'status' => $request->status,
        ]);

        if (!$atualizado) {
            return response()->json([
                'error' => 'Não foi possível alterar o status da tarefa'
            ], 401);
        }

        return response()->json([
            'status' => $task->status
        ], 200);
    }


    public function store(Request $request)
    {
        // Validação dos campos recebidos
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'required|string|in:baixa,media,alta',
            'status' => 'required|string|in:nao_concluida,em_andamento,concluida',
        ]);

        // Criação da tarefa vinculada ao usuário autenticado
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'priority' => $request->priority ?? 'media',
            'status' => $request->status ?? 'nao_concluida',
            'user_id' => $request->user()->id,
        ]);

        return response()->json($task, 201);
    }

    public function tasksByMonth(Request $request)
    {
        $user = $request->user();

        $tasks = Task::where('user_id', $user->id)
            ->where('status', TaskStatus::NaoConcluida)
            ->orderBy('due_date', 'asc')
            ->get()
            ->groupBy(function ($task) {
                return \Carbon\Carbon::parse($task->due_date)->format('m-Y');
            });

        // TRANSFORMA EM ARRAY DE OBJETOS
        $formatted = $tasks->map(function ($items, $period) {
            return [
                'period' => $period,
                'tasks'  => $items,
            ];
        })->values(); // <-- transforma keys em índices numéricos

        return response()->json($formatted);
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task não encontrada'], 404);
        }
        $task->delete();
        return response()->noContent();
    }
}
