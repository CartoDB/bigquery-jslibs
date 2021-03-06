-----------------------------------------------------------------------
--
-- Copyright (C) 2021 CARTO
--
-----------------------------------------------------------------------

CREATE OR REPLACE FUNCTION `@@BQ_PROJECTID@@.@@BQ_DATASET_QUADKEY@@.QUADINT_FROMZXY`(z INT64, x INT64, y INT64)
    RETURNS INT64
AS (((z & 0x1F) | (x << 5) | (y << (z + 5))));

CREATE OR REPLACE FUNCTION `@@BQ_PROJECTID@@.@@BQ_DATASET_QUADKEY@@.ZXY_FROMQUADINT`(quadint INT64)
    RETURNS STRUCT<z INT64, x INT64, y INT64>
AS (STRUCT(
  quadint & 0x1F as z,
  (quadint >> 5) & ((1 << (quadint & 0x1F)) - 1) as x,
  (quadint >> (5 + (quadint & 0x1F))) as y
));