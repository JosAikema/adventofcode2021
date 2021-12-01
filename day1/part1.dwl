%dw 2.0
output application/json
var splitted = payload splitBy '\n'
var results = splitted map (value, key) -> {
    increase: if ((value as Number) > ((splitted[key-1] default 5000) as Number)) 1 else 0
}
---
sum(results.*increase)
