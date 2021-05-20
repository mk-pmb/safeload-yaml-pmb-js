
Why not check the major version number?
=======================================

An early draft of this module tried to decide the correct function based
on the version field of `js-yaml`'s package.json.

Reasons why I scrapped it:

* When bundling for web browsers, it adds a useless dependency on the
  `package.json`.
* The purpose of this module is to defend against unexpected `require()`
  behaviour. Which means we have limited trust in whether `require()`
  will pick what we expect it picks. In exotic cases, it might pick
  `package.json` from another directory than the main `js-yaml` module.


