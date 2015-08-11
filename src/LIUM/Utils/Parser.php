<?php

namespace LIUM\Utils;

abstract class Parser {
  protected $environment;
  protected $logger;
  protected $extensions = array('seg');
  protected $headers = array(
    'show_name',
    'channel_number',
    'start',
    'length',
    'speaker_gender',
    'type_band',
    'type_environment',
    'speaker_label',
    'end' // computed
  );
  public function __construct(\LIUM\Utils\Environment $environment, \LIUM\Utils\LoggerAdapter $logger, $processor = FALSE) {
    $this->environment = $environment;
    $this->logger = $logger;
    if (!empty($processor)) {
      if ($processor instanceof \LIUM\Utils\Processor) {
        $this->processor = $processor;
      }
      else {
        throw new Exception("Processor must be instance of \LIUM\Utils\Processor");
      }
    }
  }
  abstract public function parse();
}
