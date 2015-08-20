<?php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use LIUM\Utils\Environment;

require_once("./vendor/autoload.php");
$environment = new Environment(FALSE);
$environment->set("input_directory_path", "data/input")
  ->set("output_directory_path", "data/output")
  ->set("seg_directory_path", "data/output")
  ->set("front_end_app_root", "");

$app = new Application();
$app['sshs_environment'] = $environment;

$app->before(function (Request $request) {
  if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
    $data = json_decode($request->getContent(), true);
    $request->request->replace(is_array($data) ? $data : array());
  }
});

$app->get('/assets', function() use($app) { 
    $output = array();
    $input_dir = $app['sshs_environment']->get('input_directory_path');
    $output_dir = $app['sshs_environment']->get('output_directory_path');
    $app_root = $app['sshs_environment']->get('front_end_app_root');
    $files = scandir($input_dir);
    foreach ($files AS $file) {
      $info = pathinfo($file);
      if (!empty($info['extension']) && $info['extension'] == 'mp4') {
        $json_path = $output_dir . '/' . $info['filename'] . '.json';
        $speaker_path = $output_dir . '/speakers.json';
        if (file_exists($json_path) && file_exists($speaker_path)) {
          $row = array(
            'video' => $app_root . $input_dir . '/' . $file, 
            'json' => $app_root . $json_path,
            'speakers' => $app_root . $speaker_path
          );
          $output[] = $row;
        }
      }
    }
    return $app->json($output);
});

$app->post('/segments', function (Request $request) use ($app) {
  $output_dir = $app['sshs_environment']->get('output_directory_path');
  if (!empty($request->get('segments')) && !empty($request->get('asset'))) {
    $info = pathinfo($request->get('asset'));
    $file_name = 'output-' . $info['filename'] . date('Y-m-d-his') . '.json';
    $url = $output_dir . '/' . $file_name;
    try {
      $fp = fopen($url, 'w');
      $outcome = fwrite($fp, json_encode($request->get('segments')));
      fclose($fp);
      return new Response('Created new output file: ' . $url, 201);
    }
    catch (Exception $e) {
      return new Response($e->getMessage(), 400);
    }
  }
  else {
    return new Response('Malformed request.', 400);
  }
});

$app->run();
