* [Simple Leaflet demo](https://protomaps.github.io/protomaps.js/examples/leaflet.html)
* [Satellite + labels demo](https://protomaps.github.io/protomaps.js/examples/labels.html)
* [GeoJSON between basemap and labels demo](https://protomaps.github.io/protomaps.js/examples/sandwich.html)
* [JSON style](https://protomaps.github.io/protomaps.js/examples/json_style.html)

Above examples use a local PMTiles file and do not need an API key.

[Worldwide Demo](http://protomaps.com/map/)

A vector map renderer for the web. < 20 KB gzipped.

See the docs on [what protomaps.js is, what protomaps.js is not](https://protomaps.com/docs/protomaps-js#protomapsjs-is-not)

## How to use

```html
<script src="https://unpkg.com/protomaps@latest/dist/protomaps.min.js"></script>
<script>
    const map = L.map('map')
    var layer = new protomaps.LeafletLayer({url:'FILE.pmtiles OR ENDPOINT/{z}/{x}/{y}.pbf'})
    layer.addTo(map)
</script>
```

## Project Status

The design is still evolving rapidly, so do not expect any kind of stable internal or external-facing API. But please do report bugs and discuss requirements in the Issues.

## See Also
* [KothicJS](https://github.com/kothic/kothic-js)
* [Tangram](https://github.com/tangrams/tangram)
