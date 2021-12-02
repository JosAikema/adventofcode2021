%dw 2.0
output application/json
import * from dw::core::Strings

var splitted = payload splitBy '\n'

var forward = splitted filter substring($,0,1) == "f" map {
    value: ($ splitBy ' ')[1]
}

var down = splitted filter substring($,0,1) == "d" map {
    value: ($ splitBy ' ')[1]
}

var up = splitted filter substring($,0,1) == "u" map {
    value: ($ splitBy ' ')[1]
}

var total_forward = sum(forward.*value)
var total_down = sum(down.*value)
var total_up = sum(up.*value)

var depth = total_down - total_up
---
total_forward * depth
