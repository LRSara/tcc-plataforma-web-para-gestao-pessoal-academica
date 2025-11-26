<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    /**
     * Lista todas as notas do usuário autenticado.
     */
    public function index(Request $request)
    {
        $notes = Note::with('subject') // carrega o objeto subject junto
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notes);
    }

    /**
     * Cria uma nova nota.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:5000',
            'subject_id' => 'nullable|exists:subjects,id',
            'is_favorite' => 'boolean',
        ]);

        // Garantir valor padrão
        $validated['is_favorite'] = $validated['is_favorite'] ?? 0;
        $validated['user_id'] = $request->user()->id;

        $note = Note::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'subject_id' => $validated['subject_id'] ?? null,
            'user_id' => $validated['user_id'],
            'is_favorite' => $validated['is_favorite'],
        ]);

        return response()->json($note, 201);
    }


    /**
     * Atualiza uma nota existente.
     */
    public function update(Request $request, string $id)
    {
        $note = Note::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'subject_id' => 'nullable|integer|exists:subjects,id',
            'is_favorite' => 'boolean',
        ]);

        $validated['user_id'] = $request->user()->id;

        $atualizado = $note->update($validated);

        if (!$atualizado) {
            return response()->json([
                'error' => 'Não foi possível alterar o status da nota'
            ], 422);
        }

        return response()->json($note);
    }


    /**
     * Remove a nota.
     */
    public function destroy(Request $request,  string $id)
    {
        $note = Note::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if (!$note) {
            return response()->json(['message' => 'Task não encontrada'], 404);
        }

        $note->delete();

        return response()->json(['message' => 'Nota removida com sucesso']);
    }
}
