%dw 2.0
output application/json
var splitted = payload splitBy '\n' map ($ as Number)
var results = splitted map (value, key) -> {
    increase: if ((value + (splitted[key+1] default 0) + (splitted[key+2] default 0)) > (splitted[key-1] + value + (splitted[key+1] default 0))) 1 else 0
}
---
sum(results.*increase)
