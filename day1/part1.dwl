%dw 2.0
output application/json
var splitted = payload splitBy '\n' map ($ as Number)
var results = splitted map (value, key) -> {
    increase: if (value > (splitted[key-1] default 5000)) 1 else 0,
    field: value
}
---
sum(results.*increase)

