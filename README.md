# sshs-identify
Experimental implemenation of [LIUM diarization library](http://www-lium.univ-lemans.fr/diarization/doku.php/welcome) for [She Said, He Said](http://www.shesaidhesaidproject.org). This very rudimentary toolkit has two areas of functionality that should probably be split into separate repos. The LIUM toolkit allows for the diarization of 16-bit mono .wav files. The LIUM library outputs a .seg file that contains speaker clusters. It determines when a sound is a person speaking and attempts to label instances of the same speaker. The segment file is then parsed to a more common format (JSON). The front end application pulls in the JSON file and allows identification of speakers manually (connecting LIUM speaker id to actual speaker). 

## Installation
For the toolkit, clone and install with composer.
```
composer install
```
For the front end, configure webserver to work with [Silex](http://silex.sensiolabs.org/). There are good instructions for most common webservers [here](http://silex.sensiolabs.org/doc/web_servers.html). A sample Apache configuration file is included.

## LIUM Toolkit
The LIUM Toolkit is a set of very simple classes. By default the toolkit expects directories inside of the data folder: data/input, data/output and data/logs. These locations may be changed in diarization.php. The input directory should contain 16-bit mono .wav files. The toolkit will write .seg and .json files to the output directory. It will log log to the log directory. To use the toolkit in its default state excute diarization.php from the command line. Something like:

```
php diarization.php &
```

NB: It's reccomended to run the script in a background process as diarization can take a very long time.

## Front End Tool
The front end tool is a simple interface written with jQuery and React. It allows humans to positively identify speakers. The application uses Silex endpoints in index.php. It anticipates a .json version of the segmentation file and an mp4 of the desired audio file. It also requires a list of potential speakers in JSON format. Minimally:

```
[
  {full_name: 'Bob Schmidt'}
]
```

The front end tool's output JSON will be dated and sent to the output directory.

NB: The front end app currently expects mp4 and json files to have matching file names and anticpates speakers.json for the list of potential speakers.

## Final Example Output
```
{
    "show_name": "large-sample-monowav",
    "channel_number": "1",
    "start": "191644",
    "length": "195",
    "speaker_gender": "F",
    "type_band": "S",
    "type_environment": "U",
    "speaker_label": "S1076",
    "end": 191839,
    "key": "112",
    "ref": "112",
    "currentVideoTime": 2685.852855,
    "assigned_speaker": "Rhonda Fields"
}
```
