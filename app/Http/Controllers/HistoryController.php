<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Exception;
use Inertia\Inertia;

class HistoryController extends Controller
{
    /**
     * Add a new playlist to history
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        Log::debug('Received history add request', [
            'user_id' => Auth::id(),
            'playlist_id' => $request->input('playlist_id'),
            'mood' => $request->input('mood')
        ]);

        try {
            // Validate the request
            $validated = $request->validate([
                'playlist_id' => 'required|string|max:255',
                'playlist_name' => 'required|string|max:255',
                'playlist_url' => 'required|url|max:255',
                'mood' => 'required|string|max:50',
                'image_url' => 'required|url|max:255'
            ]);

            Log::debug('Validated request data', $validated);

            // Check for duplicate entry
            $existingEntry = History::where('user_id', Auth::id())
                ->where('playlist_id', $validated['playlist_id'])
                ->first();

            if ($existingEntry) {
                Log::info('Duplicate playlist entry found', [
                    'user_id' => Auth::id(),
                    'playlist_id' => $validated['playlist_id'],
                    'existing_entry' => $existingEntry->id
                ]);

                return response()->json([
                    'message' => 'Playlist already in history',
                    'history_id' => $existingEntry->id
                ], 200);
            }

            // Create new history entry
            $history = History::create([
                'user_id' => Auth::id(),
                'playlist_id' => $validated['playlist_id'],
                'playlist_name' => $validated['playlist_name'],
                'playlist_url' => $validated['playlist_url'],
                'mood' => $validated['mood'],
                'image_url' => $validated['image_url']
            ]);

            Log::debug('Successfully created history entry', [
                'history_id' => $history->id,
                'user_id' => Auth::id(),
                'playlist_id' => $validated['playlist_id']
            ]);

            return response()->json([
                'message' => 'Successfully added to history',
                'history' => $history
            ], 201);

        } catch (Exception $e) {
            Log::error('Error saving playlist to history', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'playlist_id' => $request->input('playlist_id'),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to save playlist to history',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $history = History::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('History', [
            'history' => $history
        ]);
    }
}
