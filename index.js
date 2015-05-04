var Hash = {}

Hash.decode = function (hash, opts) {
  if (typeof opts == 'undefined') throw new Error('`num` or `opts` argument required')
  if (typeof opts == 'number') {
    opts = { num: opts }
  }

  var num = opts.num

  var ranges = []
  for (var i = 0; i < num; i++) {
    ranges[i] = [-100, 100]
  }
  var id = 0

  for (var i = 0; i < hash.length; i++) {
    var range = ranges[id++ % ranges.length]
    var bit = hash[i]
    range[bit^1] = avg(range)
  }

  var averaged = []
  for (var i = 0; i < ranges.length; i++) {
    averaged[i] = avg(ranges[i])
  }
  return averaged
}

Hash.encode = function (values, opts) {
  if (typeof opts == 'number') {
    opts = { precision: opts }
  }
  if (!opts) opts = {}

  var precision = opts.precision || 60

  var ranges = []
  for (var i = 0; i < values.length; i++) {
    if (values[i] < -100 || values[i] > 100) {
      throw new Error('accepted input range: [-100, 100]')
    }
    ranges[i] = [-100, 100]
  }

  var hash = ''
  var i = 0

  for(var j = 0; j < precision; j++) {
    var arg = i++ % values.length
    var range = ranges[arg]
    var value = values[arg]
    var mid = avg(range)

    var bit = value > mid ? 1 : 0
    range[bit^1] = mid

    //@TODO performance test of string concat vs number adding
    hash += bit
  }

  return hash
}

function avg (r) {
  return (r[0] + r[1]) / 2
}

module.exports = Hash
