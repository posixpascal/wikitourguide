const dumpster = require('dumpster-dive');
const wtf = require('wtf_wikipedia');
const fs = require('fs');
const parseDMS = require('parse-dms');

dumpster(
  {
    file: './data/enwiki-latest-pages-articles.xml',
    db: 'wikitourguide',
    collection: 'pages_en',
      db_url: process.env.MONGODB_URL,
    custom: function (doc) {
      const parseDMS = require('parse-dms');
      const fs = require('fs');

      function extractGeo(doc) {
        let primaryCoordinate = {};
        let hasPrimaryCoordinate = false;
        let coordinates = [];

        for (const templateCls of doc.templates()) {
          const template = templateCls.json();
          if (!template.template) {
            continue;
          }
          if (template.template.toLowerCase() !== 'coordinate') {
            continue;
          }

          let coord = {};

          if (!template.ns) {
            fs.writeFileSync(
              './broken-dms.txt',
              `p${doc.pageID()}, ${doc.title}
`,
              { encoding: 'utf-8', flag: 'a+' },
            );
            continue;
          }

          if (template.ns.includes('/')) {
            coord = parseDMS(template.ns + ' ' + template.ew);
          } else {
            coord.lat = parseFloat(`${template.ns}`);
            coord.lon = parseFloat(`${template.ew}`);
          }

          const innerCoordinate = template.text || template.article;

          // Now determine whether or not is primary coordinate
          hasPrimaryCoordinate = hasPrimaryCoordinate || !innerCoordinate;
          coord.name = template.name ? template.name : doc.title();
          coord.region = template.region;
          coord.text = template.text;
          coord.type = template.type;
          coordinates.push(coord);

          if (!innerCoordinate) {
            primaryCoordinate = { ...coord };
          }
        }

        let location = hasPrimaryCoordinate
          ? {
              type: 'Point',
              coordinates: [primaryCoordinate.lon, primaryCoordinate.lat],
            }
          : null;

        return {
          hasCoordinates: hasPrimaryCoordinate,
          coordinates,
          location,
        };
      }

      function extractSection(doc) {
        return {
          title: doc.title(),
          text: doc.text(),
          index: doc.index(),
          children: doc.children().map((section) => extractSection(section)),
        };
      }

      let fixK = (js) => {
        if (typeof js === 'object' && !Array.isArray(js) && js !== null) {
          const copy = {};
          for (let key in js) {
            key = key.replace(/\./, '_');
            if (js.hasOwnProperty(key)) {
              copy[key] = fixK(js[key]);
            }
          }

          return copy;
        } else {
          return js;
        }
      };

      const coord = extractGeo(doc);
      return {
        _id: doc.title(),
        title: doc.title(),
        isDisambiguation: doc.isDisambiguation(),
        isRedirect: doc.isRedirect(),

        url: doc.url(),
        // metadata
        templates: doc.templates().map((t) => fixK(t.json({ encode: true }))),
        infoboxes: doc.infoboxes().map((ib) => fixK(ib.json({ encode: true }))),
        // the text of the article
        sections: doc.sections().map((sec) => extractSection(sec)),
        // images
        images: doc.images().map((i) => ({
          url: i.url(),
          thumbnail: i.thumbnail(),
        })),
        // categories
        categories: doc.categories(),

        // custom extracted coordinates
        hasCoordinates: coord.hasCoordinates,
        coordinates: coord.coordinates,
        location: coord.location,
      };
    },
  },
  () => console.log('done!'),
);
