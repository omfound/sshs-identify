<?php

use Katzgrau\KLogger\Logger;
use LIUM\Utils\Environment;
use LIUM\Utils\LoggerAdapter;
use LIUM\Utils\ProcessorCluster;
use LIUM\Utils\ParserJSON;
use LIUM\Diarization\Lium;

require_once("./vendor/autoload.php");

/**
 * Set up environment
 */
$environment = new Environment();
$environment->set("java_path", "/usr/bin/java")
  ->set("lium_jar_path", "./lium_spkdiarization-8.4.1.jar")
  ->set("input_directory_path", "data/input")
  ->set("output_directory_path", "data/output")
  ->set("seg_directory_path", "data/output");
/**
 * Make sure environment is setup correctly and all assets are present.
 */
try {
  $environment->validate();
  /**
   * Build logger adapter
   */
  $logger = new Logger('./data/logs', Psr\Log\LogLevel::INFO, array('filename' => 'diarization-log'));
  $logger_adapter = new LoggerAdapter($logger, 'info', 'error');
  //$lium = new Lium($environment, $logger_adapter);
  //$lium->executeAll();
  /**
   * Parse segmentation file created by lium into JSON
   */
  $processor = new ProcessorCluster();
  $parser = new ParserJSON($environment, $logger_adapter, $processor); 
  $parser->parse();
}
catch (Exception $e) {
  print "Environment Error: " . $e->getMessage() . "\n";
}
