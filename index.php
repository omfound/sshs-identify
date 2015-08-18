<?php
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

$app->run();
