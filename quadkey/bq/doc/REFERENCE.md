## Reference

### QUADKEY

#### quadkey.VERSION

{{% bannerNote type="code" %}}
quadkey.VERSION () -> INT64
{{%/ bannerNote %}}

Returns the current version of the quadkey library.

#### quadkey.QUADINT_FROMZXY

{{% bannerNote type="code" %}}
quadkey.QUADINT_FROMZXY(z INT64, x INT64, y INT64) -> INT64
{{%/ bannerNote %}}

* `z`: `INT64` Level of zoom.
* `x`: `INT64` horizontal position of a tile.
* `y`: `INT64` vertical position of a tile.

Returns the quadint representation for tile x, y and a zoom z.

#### quadkey.ZXY_FROMQUADINT

{{% bannerNote type="code" %}}
quadkey.ZXY_FROMQUADINT(quadint INT64) -> STRUCT< z INT64, x INT64, y INT64 >
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to extract tile information from.

Returns the level of zoom z and coordinates x, y for a given quadint.

#### quadkey.LONGLAT_ASQUADINT

{{% bannerNote type="code" %}}
quadkey.LONGLAT_ASQUADINT(longitude FLOAT64, latitude FLOAT64, resolution INT64) -> INT64
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `resolution`: `INT64` Level of detail or zoom.

Returns the quadint representation for a given level of detail and geographic coordinates.

#### quadkey.QUADINT_FROMQUADKEY

{{% bannerNote type="code" %}}
quadkey.QUADINT_FROMQUADKEY(quadkey STRING) -> INT64
{{%/ bannerNote %}}

* `quadkey`: `STRING` quadkey we want to convert to quadint.

Transform a quadkey index to an equivalent quadint.

#### quadkey.QUADKEY_FROMQUADINT

{{% bannerNote type="code" %}}
quadkey.QUADKEY_FROMQUADINT(quadint INT64) -> STRING
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to convert to quadkey.

Transform a quadint index to an equivalent quadkey.

#### quadkey.TOPARENT

{{% bannerNote type="code" %}}
quadkey.TOPARENT(quadint INT64, resolution INT64) -> INT64
{{%/ bannerNote %}}

* `quadint`: `INT64`    quadint we want to get the parent from.
* `resolution`: `INT64` resolution of the desired parent.

Returns the parent quadint of a given quadint for a specific resolution. A parent quadint is a quadint of smaller level of detail which contains the current quadint.

#### quadkey.TOCHILDREN

{{% bannerNote type="code" %}}
quadkey.TOCHILDREN(quadint INT64, resolution INT64) -> ARRAY<INT64>
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to get the children from.
* `resolution`: `INT64` resolution of the desired children.

Returns an array with the children quadint of a given quadint for a specific resolution. A children quadint is a quadint of bigger level of detail which is contained by the current quadint. Each quadint has 4 children.

#### quadkey.SIBLING

{{% bannerNote type="code" %}}
quadkey.SIBLING(quadint INT64, direction STRING) -> INT64
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to get the sibling from.
* `direction`: `STRING` <code>'right'|'left'|'up'|'down'</code> direction where we want to move to extract the next sibling. 

Returns the quadint directly next to the given quadint at the same level of zoom. The direction must be sent as argument and currently horizontal/vertical movements are allowed.

#### quadkey.KRING

{{% bannerNote type="code" %}}
quadkey.KRING(quadint INT64, distance INT64) -> ARRAY<INT64>
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to get the KRING from.
* `distance`: `INT64` Distance (in cells) to the source.

Returns an array with all the quadints directly next to the given quadint at the same level of zoom. We consider diagonal, horizontal and vertical nearby quadints and the current quadint so KRING should always return 9 quadints.

#### quadkey.BBOX

{{% bannerNote type="code" %}}
quadkey.BBOX(quadint INT64) -> ARRAY<FLOAT64>
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to get the bbox from.

Returns the boundary box of a given quadint. This boundary box contains the minimum and maximum longitude and latitude.

#### quadkey.ST_ASQUADINT

{{% bannerNote type="code" %}}
quadkey.ST_ASQUADINT(point GEOGRAPHY, resolution INT64)  -> INT64
{{%/ bannerNote %}}

* `point`: `GEOGRAPHY` point we want to get the quadint from.
* `resolution`: `INT64` Level of detail or zoom.

Converts a given point at given level of detail to a quadint.

#### quadkey.ST_ASQUADINT_POLYFILL

{{% bannerNote type="code" %}}
quadkey.ST_ASQUADINT_POLYFILL(geo GEOGRAPHY, resolution INT64) -> ARRAY<INT64>
{{%/ bannerNote %}}

* `geo`: `GEOGRAPHY` geography we want to extract the quadints from.
* `resolution`: `INT64` Level of detail or zoom.

Returns an array of quadints contained by the given geography at a given level of detail.

#### quadkey.ST_GEOGFROMQUADINT_BOUNDARY

{{% bannerNote type="code" %}}
quadkey.ST_GEOGFROMQUADINT_BOUNDARY(quadint INT64) -> GEOGRAPHY
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to get the boundary geography from.

Returns the geography boundary for a given quadint. We extract the boundary the same way as when we calculate the bbox, then enclose it in a GEOJSON and finally transform it to geography.

### quadkey.LONGLAT_ASQUADINTLIST_RESOLUTION

{{% bannerNote type="code" %}}
quadkey.LONGLAT_ASQUADINTLIST_RESOLUTION(longitude FLOAT64, latitude FLOAT64, __zoom_min INT64, __zoom_max INT64, __zoom_step INT64, __resolution INT64) -> ARRAY< STRUCT < id INT64, z INT64, x INT64, y INT64 > >
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `__zoom_min`: `INT64` minimum zoom to get the quadints from.
* `__zoom_max`: `INT64` maximum zoom to get the quadints from.
* `__zoom_step`: `INT64` used for skipping levels of zoom
* `__resolution`: `INT64` resolution added to the current zoom to extract the quadints.

Returns the Quadint indexes of each level of zoom requested for a position. Then these indexes are used for grouping and generating aggregations of points in all the zoom range requested. Notice that we use an additional variable "resolution" for adjusting the level of granularity we want for a level of zoom.
