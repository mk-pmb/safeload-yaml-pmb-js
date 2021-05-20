
<!--#echo json="package.json" key="name" underline="=" -->
safeload-yaml-pmb
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Re-export my current favorite safe YAML loading function. Bridges the gap
between js-yaml v3 and v4.
<!--/#echo -->



API
---

This module re-exports the `safeLoad` or `load` function from `js-yaml`,
depending on which of them is safe to use for loading YAML.



Why?
----

Unfortunately, `js-yaml` v3 had an unsafe `load` function,
so you had to remember to use the `safeLoad` function to explicitly
opt-out of madness.

In v4, the developers have learned from their past API design mistakes,
and the `load` function is now safe by default.

However, to make sure everyone knows they fixed it, they made another
problematic API design choice: The `safeLoad` function now throws an
error, telling you it's deprecated and you should use just `load`.

Thus, you now have a double-edged sword:

* If you use the `load` function,
  and for whatever reasons your `require()` happens to use `js-yaml`
  v3, your program is insecure.
* If you use the `safeLoad` function,
  and for whatever reasons your `require()` happens to use `js-yaml`
  v4, your program fails to load the file data.

In an ideal world, you could ensure that your program is only ever invoked
in an environment in which `require('js-yaml')` will pick v4 or later.
In the real world, I need a reliable and robust fallback.










<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
