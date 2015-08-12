<?php

namespace LIUM\Utils;

class Environment {
  protected $java_path;
  protected $lium_jar_path;
  protected $input_directory_path;
  protected $output_directory_path;
  protected $front_end_app_root;
  public function validate($java = TRUE) {
    if ($java == TRUE) {
    $java_version = exec($this->java_path . ' -version 2>&1');
      if (empty($java_version) || strpos($java_version, 'java: not found') !== FALSE) {
        throw new \Exception('Java runtime of x.x or better is required for diarization.');
      }
      if (!file_exists($this->lium_jar_path)) {
        throw new \Exception('Lium jar path is undefined or not found.');
      }
    }
    if (!file_exists($this->input_directory_path)) {
      throw new \Exception('Input directory is not found.');
    }
    if (!file_exists($this->output_directory_path)) {
      throw new \Exception('Output directory is not found.');
    }
    if (!file_exists($this->seg_directory_path)) {
      throw new \Exception('Segmentation directory is not found.');
    }
    if (isset($this->front_end_app_root) && !file_exists($this->front_end_app_root)) {
      throw new \Exception('Segmentation directory is not found.');
    }
  }
  public function buildShowName($source) {
    return strtolower(str_replace(array(' ', '.'), array('_', ''), $source));
  }
  public function get($property) {
    return !empty($this->{$property}) ? $this->{$property} : FALSE;
  }
  public function set($property, $value) {
    $this->{$property} = $value;
    return $this;
  }
}
