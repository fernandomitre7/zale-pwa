# Some Angular notes, for cli and other stuff

## To generate a component inside a module

`ng g component {name} -m {module_name}`

Example: `ng g component auth -m auth`

> This will Generate AuthComponent with html, css and spec.ts inside /auth and adds it to AuthModule.

Other Examples:

* `ng g guard auth -m auth`

## To generate a service inside a module

`ng g service {module_name}/{service_name}`

Example: `ng g service auth/auth`


