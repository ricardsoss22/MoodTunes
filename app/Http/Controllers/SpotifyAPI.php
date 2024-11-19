<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class SpotifyAPI extends Controller
{
    /**
     * Get a Spotify access token using client credentials flow.
     * The token is cached for 3600 seconds (1 hour) to avoid making unnecessary requests.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getToken()
    {
        // Try to get the token from cache first
        $cachedToken = Cache::get('spotify_token');
        if ($cachedToken) {
            return response()->json(['access_token' => $cachedToken]);
        }

        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_SECRET');
        
        try {
            $response = Http::asForm()
                ->withBasicAuth($clientId, $clientSecret)
                ->post('https://accounts.spotify.com/api/token', [
                    'grant_type' => 'client_credentials'
                ]);

            if ($response->successful()) {
                $data = $response->json();
                // Cache the token for slightly less than its expiry time (3600 seconds)
                Cache::put('spotify_token', $data['access_token'], 3500);
                return response()->json(['access_token' => $data['access_token']]);
            }

            return response()->json(['error' => 'Failed to get Spotify token'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to connect to Spotify API'], 500);
        }
    }
}
