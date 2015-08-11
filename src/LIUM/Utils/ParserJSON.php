<?php

namespace LIUM\Utils;

use LIUM\Utils\Parser;

class ParserJSON extends Parser {
  public function parse() {
    $input_dir = $this->environment->get('seg_directory_path');
    $files = scandir($input_dir);
    foreach ($files AS $file) {
      $info = pathinfo($file);
      if (!empty($info['extension']) && in_array($info['extension'], $this->extensions)) {
        $this->logger->info('Beginning to parse: ' . $file);
        $data = $this->parseFile($input_dir . '/' . $file);
        $show_name = $this->environment->buildShowName($file);
        $show_name = rtrim($show_name, 'seg') . '.json';
        $this->logger->info('Writing: ' . $show_name);
        $this->writeJSON($show_name, $data);
        $this->logger->info('Completed: ' . $show_name);
      }
    }
  }
  protected function parseFile($file) {
    $output = array();
    $data = file_get_contents($file);
    if (!empty($data) && is_string($data)) {
      $data = explode("\n", $data); 
      foreach ($data as $row) {
        if (strpos($row, ';;') !== 0) {
          $exploded_row = explode(' ', $row);
          foreach ($exploded_row AS $key => $value) {
            $output_row[$this->headers[$key]] = $value;
          }
          // Handle end
          $output_row['end'] = $output_row['start'] +  $output_row['length'];
          $output[] = $output_row;
        }
      } 
    }
    else {
      throw new Exception("Failed to open file: "  . $file . ". Check environment configuration.");
    }
    if (!empty($this->processor)) {
      $output = $this->processor->alter($output);
    }
    return $output;
  }
  protected function writeJSON($file_name, $data) {
    $url = $this->environment->get('output_directory_path') . '/' . $file_name;
    $fp = fopen($url, 'w');
    fwrite($fp, json_encode($data));
    fclose($fp); 
  }
}
