<?php

namespace App\Http\Controllers;


use App\Models\customtime;
use App\Models\food;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

include_once "../app/Models/customtime.php";

class TestController extends Controller
{

    public function getCountOfPages(Request $request, $username)
    {
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);


        $page = 1;
        while (true) {

            $response = $client->request('GET', "https://api.github.com/users/$username/repos?sort=updated&page=$page&per_page=15");
            $text = $response->getBody();
            if ($text == "[]") {
                $page--;
                break;
            } else {
                $page++;
            }
        }
        return \Response::json($page);
    }

    public function getPublicRepositories(Request $request, $username, $page)
    {
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);
        $response = $client->request('GET', "https://api.github.com/users/$username/repos?sort=updated&page=$page&per_page=15");
        $text = $response->getBody();
        return $text;
    }

    public function getUserRepositories(Request $request, $username, $page, $token)
    {
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);

        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ];

        $response = $client->request('GET', "https://api.github.com/user/repos?sort=updated&type=owner&page=$page&per_page=15", ['headers' => $headers]);
        $text = $response->getBody();
        return $text;
    }


    public function getUserCountOfPages(Request $request, $token)
    {
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ];

        $page = 1;
        while (true) {

            $response = $client->request('GET', "https://api.github.com/user/repos?sort=updated&type=owner&page=$page&per_page=15", ['headers' => $headers]);
            $text = $response->getBody();
            if ($text == "[]") {
                $page--;
                break;
            } else {
                $page++;
            }
        }
        return \Response::json($page);
    }

    public function getUser(Request $request, $token)
    {
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);


        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ];

        $response = $client->request('GET', "https://api.github.com/user", ['headers' => $headers]);
        $text = $response->getBody();
        return $text;
    }

    public function changeVisibility(Request $request,$username,$reponame,$visibility, $token)
    {
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);


        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ];

        $isPrivate = $visibility=='private'?true:false;
        $response = $client->request('PATCH', "https://api.github.com/repos/$username/$reponame", 
        [
            'body' => json_encode([
                'private' => $isPrivate,
                'visibility' =>$visibility
            ]),
            'headers' => $headers
        ]);
        $text = $response->getBody();
        return $text;
    }


    public function deleteRepository(Request $request,$username,$reponame,$token){
        $client = new \GuzzleHttp\Client(['verify' => 'C:/Users/thespiker/Desktop/Sites/php/testLara/cacert.pem']);


        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ];
                                              
        $response = $client->request("DELETE", "https://api.github.com/repos/$username/$reponame", 
        [
            'headers' => $headers
        ]);
        $text = $response->getBody();
        return \Response::json(['success' => 'success'], 200);
    }

}