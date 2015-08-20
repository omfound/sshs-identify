<?php

namespace LIUM\Diarization;

class Lium {
  protected $environment;
  protected $extensions = array('wav', 'sph');
  public function __construct(\LIUM\Utils\Environment $environment, \LIUM\Utils\LoggerAdapter $logger) {
    $this->environment = $environment;
    $this->logger = $logger;
  }
  public function executeAll() {
    $input_dir = $this->environment->get('input_directory_path');
    $files = scandir($input_dir);
    foreach ($files AS $file) {
      $info = pathinfo($file);
      if (!empty($info['extension']) && in_array($info['extension'], $this->extensions)) {
        $this->logger->info('Beginning diarization of ' . $file);
        $show_name = $this->environment->buildShowName($info['filename']); 
        $output = $this->execute($input_dir . '/' . $file, $show_name);
        $this->logger->info($output);
        $this->logger->info('Finished diarization of ' . $file);
      }
    }
  }
  public function execute($file, $show_name) {
    $command = $this->environment->get('java_path') . ' -Xmx2024m -jar';
    $command .= ' ' . $this->environment->get('lium_jar_path');
    $command .= ' --fInputMask=' . $file;
    $command .= ' --sOutputMask=' . $this->environment->get('output_directory_path') . '/' . $show_name . '.seg';
    $command .= ' --doCEClustering ' . $show_name;
    $command .= ' 2>&1';
    return exec($command);
  }
  public function get($property) {
    return !empty($this->{$property}) ? $this->{$property} : FALSE;
  }
  public function set($property, $value) {
    $this->{$property} = $value;
    return $this;
  }
}
