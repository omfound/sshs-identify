<?php

namespace LIUM\Utils;

use LIUM\Utils\Processor;

class ProcessorCluster extends Processor {
  protected $threshold = 3000;
  public function alter(Array $data) {
    $output = array();
    usort($data, array($this, 'sort'));
    for ($i = 0; $i < count($data); $i ++) {
      if (!empty($data[$i - 1]) && $data[$i]['start'] - $data[$i - 1]['end'] > $this->threshold && $data[$i]['speaker_label'] == $data[$i - 1]['speaker_label']) {
        $new_record = $data[$i];
        $new_record['start'] = $data[$i - 1]['start'];
        $new_record['length'] = $data[$i - 1]['length'] + $data[$i]['length'];
        $new_record['end'] = $new_record['start'] + $new_record['length'];
        if (!empty($output[$i -1])) {
          unset($output[$i -1]);
        }
        $output[$i] = $new_record;
      }
      else {
        $output[$i] = $data[$i];
      }
    }
    return $output;
  }
  public function sort($a, $b) {
    return ($a['start'] > $b['start']) ? 1 : -1;
  }
}
