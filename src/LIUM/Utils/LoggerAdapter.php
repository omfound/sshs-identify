<?php

namespace LIUM\Utils;

class LoggerAdapter {
  public function __construct($log_class, $info_method, $error_method) {
    $this->log_class = $log_class;
    $this->info_method = $info_method;
    $this->error_method = $error_method;
  }
  public function info() {
    call_user_func_array(array($this->log_class, $this->info_method), func_get_args());
  }
  public function error() {
    call_user_func_array(array($this->log_class, $this->error_method), func_get_args());
  }
}
