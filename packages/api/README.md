CREATE INDEX ON wiki_articles_de USING gist(gt_position);
CREATE INDEX ON wiki_articles_en USING gist(gt_position);

UPDATE wp_coords_red0 SET gt_position = ST_MakePoint(lat, lon);
UPDATE wiki_articles_en SET gt_position = ST_MakePoint(gt_lat, gt_lon);
