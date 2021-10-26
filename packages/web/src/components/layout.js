import React, { useEffect } from 'react';
import './layout.css';

export default function Layout({ children }) {
  useEffect(() => {
    (function (f, a, t, h, o, m) {
      a[h] =
        a[h] ||
        function () {
          (a[h].q = a[h].q || []).push(arguments);
        };
      o = f.createElement('script');
      m = f.getElementsByTagName('script')[0];
      o.async = 1;
      o.src = t;
      o.id = 'fathom-script';
      m.parentNode.insertBefore(o, m);
    })(document, window, '//analytics.geofind.io/tracker.js', 'fathom');
    window.fathom('set', 'siteId', 'WTG');
    window.fathom('trackPageview');
  }, []);
  return <div>{children}</div>;
}
