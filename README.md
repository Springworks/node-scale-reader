# Scale Reader

[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/node-scale-reader.svg)](https://greenkeeper.io/)

Node application that reads a file stream, parses its input as a weight measurement and sends it somewhere.

**Probably only useful in combination with:**
- https://github.com/Springworks/usbscale
- https://github.com/Springworks/usbscale-runner

## Usage

Install NPM module:
```
npm install -g scale-reader
```

Read data from a file and transmit stable values to a server endpoint:
```
scale-reader --help

  Usage: scale-reader [options]

  Options:

    -h, --help                                output usage information
    -F, --filename <path to file>             Path to file to read weight from
    -T, --target-url <url to PATCH endpoint>  Target URL
```

Data transmission is a `PATCH` to `--target-url` with body:
```json
{
  "grams": 1025,
  "timestamp": "2015-12-08T12:35:43.771Z"
}
```

## License
MIT
