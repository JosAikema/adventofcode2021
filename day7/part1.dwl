%dw 2.0
output application/json
var l = payload splitBy(',') map $ as Number
var length = max(l)
var m = 0 to max(l)
---
min(m map (value, key) -> sum(l map (abs(value - $))))
