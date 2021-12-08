%dw 2.0
output application/json
var l = payload splitBy(',') map $ as Number
var length = max(l)
var m = 0 to max(l)
fun calculateFuel(n) = (n * (n+1)) / 2
---
min(m map (value, key) -> sum(l map (calculateFuel(abs(value - $)))))
