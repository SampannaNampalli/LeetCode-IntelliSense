// py_stdlib.js — MAIN world, document_idle
// Python 3 standard library types used in competitive programming.
// Exports: window.PY_STDLIB_DATA

window.PY_STDLIB_DATA = {

  "deque": {
    package: "collections",
    kind: "class",
    description: "Double-ended queue. O(1) append/pop from both ends. Ideal for BFS queues and sliding-window problems.",
    constructors: [
      { signature: "deque()", desc: "Creates an empty deque." },
      { signature: "deque(iterable, maxlen)", desc: "Creates deque from iterable. If maxlen is set, old items are discarded when full.", params: [{ name: "iterable", type: "Iterable", desc: "Initial elements." }, { name: "maxlen", type: "int", desc: "Maximum length (default None = unbounded)." }] }
    ],
    fields: {
      "maxlen": { type: "int | None", desc: "The maximum size of the deque, or None if unbounded." }
    },
    methods: {
      "append":      [{ signature: "append(x)", returns: "None", desc: "Adds x to the right end. O(1).", params: [{ name: "x", type: "object", desc: "Element to add." }] }],
      "appendleft":  [{ signature: "appendleft(x)", returns: "None", desc: "Adds x to the left end. O(1).", params: [{ name: "x", type: "object", desc: "Element to add." }] }],
      "pop":         [{ signature: "pop()", returns: "object", desc: "Removes and returns the rightmost element. O(1).", throws: ["IndexError — if deque is empty"] }],
      "popleft":     [{ signature: "popleft()", returns: "object", desc: "Removes and returns the leftmost element. O(1).", throws: ["IndexError — if deque is empty"] }],
      "extend":      [{ signature: "extend(iterable)", returns: "None", desc: "Extends the right end with elements of iterable.", params: [{ name: "iterable", type: "Iterable", desc: "Elements to add." }] }],
      "extendleft":  [{ signature: "extendleft(iterable)", returns: "None", desc: "Extends the left end (note: each element is appended individually, reversing iterable order).", params: [{ name: "iterable", type: "Iterable", desc: "Elements to add." }] }],
      "rotate":      [{ signature: "rotate(n)", returns: "None", desc: "Rotates the deque n steps to the right. Negative n rotates left.", params: [{ name: "n", type: "int", desc: "Steps to rotate (default 1)." }] }],
      "clear":       [{ signature: "clear()", returns: "None", desc: "Removes all elements." }],
      "count":       [{ signature: "count(x)", returns: "int", desc: "Returns number of occurrences of x.", params: [{ name: "x", type: "object", desc: "Value to count." }] }],
      "index":       [{ signature: "index(x, start, stop)", returns: "int", desc: "Returns position of x in [start, stop).", params: [{ name: "x", type: "object", desc: "Value to find." }, { name: "start", type: "int", desc: "Start index." }, { name: "stop", type: "int", desc: "Stop index." }] }],
      "insert":      [{ signature: "insert(i, x)", returns: "None", desc: "Inserts x at position i.", params: [{ name: "i", type: "int", desc: "Index." }, { name: "x", type: "object", desc: "Element." }] }],
      "remove":      [{ signature: "remove(x)", returns: "None", desc: "Removes first occurrence of x.", params: [{ name: "x", type: "object", desc: "Element to remove." }], throws: ["ValueError — if not found"] }],
      "reverse":     [{ signature: "reverse()", returns: "None", desc: "Reverses the deque in place." }],
      "copy":        [{ signature: "copy()", returns: "deque", desc: "Returns a shallow copy." }]
    }
  },

  "Counter": {
    package: "collections",
    kind: "class",
    description: "Dict subclass for counting hashable objects. Missing keys return 0 instead of raising KeyError.",
    constructors: [
      { signature: "Counter()", desc: "Creates an empty counter." },
      { signature: "Counter(iterable)", desc: "Creates counter from an iterable, counting each element.", params: [{ name: "iterable", type: "Iterable", desc: "Elements to count." }] },
      { signature: "Counter(**kwargs)", desc: "Creates counter from keyword arguments: Counter(a=3, b=1)." }
    ],
    methods: {
      "most_common": [{ signature: "most_common(n)", returns: "list", desc: "Returns the n most common (element, count) pairs, most common first. If n is None, returns all.", params: [{ name: "n", type: "int", desc: "Number of top elements (default None = all)." }] }],
      "elements":    [{ signature: "elements()", returns: "Iterator", desc: "Returns an iterator over elements, each repeated as many times as its count. Elements with count < 1 are ignored." }],
      "subtract":    [{ signature: "subtract(iterable_or_mapping)", returns: "None", desc: "Subtracts counts (counts can go negative). Unlike difference, does not remove keys.", params: [{ name: "iterable_or_mapping", type: "Iterable | dict", desc: "Counts to subtract." }] }],
      "update":      [{ signature: "update(iterable_or_mapping)", returns: "None", desc: "Adds counts from iterable or mapping (like dict.update but adds rather than replaces).", params: [{ name: "iterable_or_mapping", type: "Iterable | dict", desc: "Counts to add." }] }],
      "total":       [{ signature: "total()", returns: "int", desc: "Returns the sum of all counts (Python 3.10+)." }]
    }
  },

  "defaultdict": {
    package: "collections",
    kind: "class",
    description: "Dict subclass that calls default_factory to supply missing values, never raising KeyError.",
    constructors: [
      { signature: "defaultdict(default_factory)", desc: "Creates a defaultdict. default_factory is called with no args to create missing values.", params: [{ name: "default_factory", type: "callable", desc: "e.g. int, list, set, lambda: 0" }] }
    ],
    fields: {
      "default_factory": { type: "callable | None", desc: "Called to provide a default value for missing keys. Set to None to disable." }
    },
    methods: {
      "get":        [{ signature: "get(key, default)", returns: "object", desc: "Returns value for key, or default. Does NOT trigger default_factory.", params: [{ name: "key", type: "object", desc: "Key." }, { name: "default", type: "object", desc: "Fallback (default None)." }] }],
      "keys":       [{ signature: "keys()", returns: "dict_keys", desc: "Returns a view of all keys." }],
      "values":     [{ signature: "values()", returns: "dict_values", desc: "Returns a view of all values." }],
      "items":      [{ signature: "items()", returns: "dict_items", desc: "Returns a view of all (key, value) pairs." }],
      "pop":        [{ signature: "pop(key, default)", returns: "object", desc: "Removes and returns value. Does NOT call default_factory.", params: [{ name: "key", type: "object", desc: "Key." }, { name: "default", type: "object", desc: "Returned if key absent." }] }],
      "setdefault": [{ signature: "setdefault(key, default)", returns: "object", desc: "If key exists, return its value. If not, insert with default_factory() result.", params: [{ name: "key", type: "object", desc: "Key." }, { name: "default", type: "object", desc: "Override for default_factory." }] }],
      "update":     [{ signature: "update(other)", returns: "None", desc: "Updates with key-value pairs from other.", params: [{ name: "other", type: "dict", desc: "Source." }] }],
      "clear":      [{ signature: "clear()", returns: "None", desc: "Removes all items." }]
    }
  },

  "heapq": {
    package: "heapq",
    kind: "class",
    description: "Min-heap functions operating on plain Python lists. Always maintains heap[0] as the smallest element. For max-heap, negate values.",
    constructors: [],
    methods: {
      "heappush":    [{ signature: "heappush(heap, item)", returns: "None", desc: "Pushes item onto heap, maintaining the heap invariant. O(log n).", params: [{ name: "heap", type: "list", desc: "The heap list." }, { name: "item", type: "object", desc: "Item to push." }] }],
      "heappop":     [{ signature: "heappop(heap)", returns: "object", desc: "Pops and returns the smallest item. O(log n). Raises IndexError if empty.", params: [{ name: "heap", type: "list", desc: "The heap list." }], throws: ["IndexError — if heap is empty"] }],
      "heapify":     [{ signature: "heapify(x)", returns: "None", desc: "Transforms list x into a heap in-place. O(n).", params: [{ name: "x", type: "list", desc: "List to heapify." }] }],
      "heapreplace": [{ signature: "heapreplace(heap, item)", returns: "object", desc: "Pops and returns smallest, then pushes item. More efficient than heappop+heappush. O(log n).", params: [{ name: "heap", type: "list", desc: "The heap." }, { name: "item", type: "object", desc: "New item." }] }],
      "heappushpop": [{ signature: "heappushpop(heap, item)", returns: "object", desc: "Pushes item then pops and returns the smallest. O(log n).", params: [{ name: "heap", type: "list", desc: "The heap." }, { name: "item", type: "object", desc: "New item." }] }],
      "nlargest":    [{ signature: "nlargest(n, iterable, key)", returns: "list", desc: "Returns the n largest elements. Efficient for small n vs full sort.", params: [{ name: "n", type: "int", desc: "Number of elements." }, { name: "iterable", type: "Iterable", desc: "Source." }, { name: "key", type: "callable", desc: "Key function (default None)." }] }],
      "nsmallest":   [{ signature: "nsmallest(n, iterable, key)", returns: "list", desc: "Returns the n smallest elements.", params: [{ name: "n", type: "int", desc: "Number of elements." }, { name: "iterable", type: "Iterable", desc: "Source." }, { name: "key", type: "callable", desc: "Key function (default None)." }] }]
    }
  },

  "math": {
    package: "math",
    kind: "class",
    description: "Mathematical functions for real numbers. All functions work on floats; use int() to convert results.",
    constructors: [],
    fields: {
      "pi":  { type: "float", desc: "The mathematical constant π ≈ 3.141592653589793." },
      "e":   { type: "float", desc: "The mathematical constant e ≈ 2.718281828459045." },
      "inf": { type: "float", desc: "Positive infinity. Use -math.inf for negative infinity." },
      "nan": { type: "float", desc: "Not a number (NaN) floating-point value." },
      "tau": { type: "float", desc: "The mathematical constant τ = 2π ≈ 6.283185307." }
    },
    methods: {
      "sqrt":      [{ signature: "sqrt(x)", returns: "float", desc: "Returns the square root of x.", params: [{ name: "x", type: "float", desc: "Non-negative value." }] }],
      "pow":       [{ signature: "pow(x, y)", returns: "float", desc: "Returns x raised to the power y (equivalent to x**y but always returns float).", params: [{ name: "x", type: "float", desc: "Base." }, { name: "y", type: "float", desc: "Exponent." }] }],
      "log":       [{ signature: "log(x, base)", returns: "float", desc: "Returns logarithm of x. With one arg, returns natural log. With two args, log base.", params: [{ name: "x", type: "float", desc: "Positive value." }, { name: "base", type: "float", desc: "Logarithm base (default e)." }] }],
      "log2":      [{ signature: "log2(x)", returns: "float", desc: "Returns base-2 logarithm of x. More accurate than log(x, 2).", params: [{ name: "x", type: "float", desc: "Positive value." }] }],
      "log10":     [{ signature: "log10(x)", returns: "float", desc: "Returns base-10 logarithm of x.", params: [{ name: "x", type: "float", desc: "Positive value." }] }],
      "ceil":      [{ signature: "ceil(x)", returns: "int", desc: "Returns the smallest integer >= x.", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "floor":     [{ signature: "floor(x)", returns: "int", desc: "Returns the largest integer <= x.", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "factorial": [{ signature: "factorial(n)", returns: "int", desc: "Returns n! (n factorial). Raises ValueError for negative n.", params: [{ name: "n", type: "int", desc: "Non-negative integer." }], throws: ["ValueError — if n is negative or non-integer"] }],
      "gcd":       [{ signature: "gcd(*integers)", returns: "int", desc: "Returns the greatest common divisor of the given integers. Python 3.9+ accepts multiple args.", params: [{ name: "*integers", type: "int", desc: "Two or more integers." }] }],
      "lcm":       [{ signature: "lcm(*integers)", returns: "int", desc: "Returns the least common multiple of the given integers (Python 3.9+).", params: [{ name: "*integers", type: "int", desc: "Two or more integers." }] }],
      "comb":      [{ signature: "comb(n, k)", returns: "int", desc: "Returns C(n, k) — number of ways to choose k items from n without repetition.", params: [{ name: "n", type: "int", desc: "Total items." }, { name: "k", type: "int", desc: "Items to choose." }] }],
      "perm":      [{ signature: "perm(n, k)", returns: "int", desc: "Returns P(n, k) — number of ways to arrange k items from n. If k is None, returns n!.", params: [{ name: "n", type: "int", desc: "Total items." }, { name: "k", type: "int", desc: "Items to arrange (default n)." }] }],
      "abs":       [{ signature: "abs(x)", returns: "float", desc: "Returns the absolute value of x.", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "fabs":      [{ signature: "fabs(x)", returns: "float", desc: "Returns the absolute value of x as a float.", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "isfinite":  [{ signature: "isfinite(x)", returns: "bool", desc: "Returns True if x is finite (not inf or nan).", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "isinf":     [{ signature: "isinf(x)", returns: "bool", desc: "Returns True if x is positive or negative infinity.", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "isnan":     [{ signature: "isnan(x)", returns: "bool", desc: "Returns True if x is NaN.", params: [{ name: "x", type: "float", desc: "Value." }] }],
      "hypot":     [{ signature: "hypot(*coordinates)", returns: "float", desc: "Returns Euclidean norm sqrt(sum of squares). For 2D: hypot(x, y).", params: [{ name: "*coordinates", type: "float", desc: "Coordinate values." }] }]
    }
  },

  "bisect": {
    package: "bisect",
    kind: "class",
    description: "Binary search functions for sorted lists. All functions assume the list is already sorted in ascending order.",
    constructors: [],
    methods: {
      "bisect_left":  [{ signature: "bisect_left(a, x, lo, hi)", returns: "int", desc: "Returns the leftmost position where x can be inserted in sorted list a to keep it sorted. If x is present, position is to its left.", params: [{ name: "a", type: "list", desc: "Sorted list." }, { name: "x", type: "object", desc: "Value to insert." }, { name: "lo", type: "int", desc: "Start index (default 0)." }, { name: "hi", type: "int", desc: "End index (default len(a))." }] }],
      "bisect_right": [{ signature: "bisect_right(a, x, lo, hi)", returns: "int", desc: "Returns the rightmost position to insert x. Also called bisect(). If x is present, position is to its right.", params: [{ name: "a", type: "list", desc: "Sorted list." }, { name: "x", type: "object", desc: "Value." }, { name: "lo", type: "int", desc: "Start." }, { name: "hi", type: "int", desc: "End." }] }],
      "bisect":       [{ signature: "bisect(a, x, lo, hi)", returns: "int", desc: "Alias for bisect_right.", params: [{ name: "a", type: "list", desc: "Sorted list." }, { name: "x", type: "object", desc: "Value." }, { name: "lo", type: "int", desc: "Start." }, { name: "hi", type: "int", desc: "End." }] }],
      "insort_left":  [{ signature: "insort_left(a, x, lo, hi)", returns: "None", desc: "Inserts x in sorted list a, keeping it sorted. Uses bisect_left for position. O(n) due to list insertion.", params: [{ name: "a", type: "list", desc: "Sorted list." }, { name: "x", type: "object", desc: "Value to insert." }, { name: "lo", type: "int", desc: "Start." }, { name: "hi", type: "int", desc: "End." }] }],
      "insort_right": [{ signature: "insort_right(a, x, lo, hi)", returns: "None", desc: "Inserts x keeping sorted order, using bisect_right for position.", params: [{ name: "a", type: "list", desc: "Sorted list." }, { name: "x", type: "object", desc: "Value." }, { name: "lo", type: "int", desc: "Start." }, { name: "hi", type: "int", desc: "End." }] }],
      "insort":       [{ signature: "insort(a, x, lo, hi)", returns: "None", desc: "Alias for insort_right.", params: [{ name: "a", type: "list", desc: "Sorted list." }, { name: "x", type: "object", desc: "Value." }, { name: "lo", type: "int", desc: "Start." }, { name: "hi", type: "int", desc: "End." }] }]
    }
  },

  "itertools": {
    package: "itertools",
    kind: "class",
    description: "Functions creating efficient iterators for looping. All return lazy iterators; wrap with list() to materialise.",
    constructors: [],
    methods: {
      "combinations":      [{ signature: "combinations(iterable, r)", returns: "Iterator", desc: "Yields r-length tuples of combinations (no repeated elements, order doesn't matter). C(n,r) total.", params: [{ name: "iterable", type: "Iterable", desc: "Input pool." }, { name: "r", type: "int", desc: "Combination length." }] }],
      "combinations_with_replacement": [{ signature: "combinations_with_replacement(iterable, r)", returns: "Iterator", desc: "Combinations allowing individual elements to be repeated.", params: [{ name: "iterable", type: "Iterable", desc: "Input pool." }, { name: "r", type: "int", desc: "Length." }] }],
      "permutations":      [{ signature: "permutations(iterable, r)", returns: "Iterator", desc: "Yields r-length permutations. If r is None, yields all full-length permutations.", params: [{ name: "iterable", type: "Iterable", desc: "Input pool." }, { name: "r", type: "int", desc: "Length (default len(iterable))." }] }],
      "product":           [{ signature: "product(*iterables, repeat)", returns: "Iterator", desc: "Cartesian product — equivalent to nested for-loops.", params: [{ name: "*iterables", type: "Iterable", desc: "Input iterables." }, { name: "repeat", type: "int", desc: "Number of repetitions (default 1)." }] }],
      "chain":             [{ signature: "chain(*iterables)", returns: "Iterator", desc: "Chains multiple iterables into a single one, one after the other.", params: [{ name: "*iterables", type: "Iterable", desc: "Iterables to chain." }] }],
      "accumulate":        [{ signature: "accumulate(iterable, func, initial)", returns: "Iterator", desc: "Returns accumulated sums (or results of func). Like a running total.", params: [{ name: "iterable", type: "Iterable", desc: "Input." }, { name: "func", type: "callable", desc: "Binary function (default operator.add)." }, { name: "initial", type: "object", desc: "Starting value (default None)." }] }],
      "groupby":           [{ signature: "groupby(iterable, key)", returns: "Iterator", desc: "Groups consecutive elements with the same key. Input should be sorted by key first.", params: [{ name: "iterable", type: "Iterable", desc: "Input." }, { name: "key", type: "callable", desc: "Key function (default identity)." }] }],
      "zip_longest":       [{ signature: "zip_longest(*iterables, fillvalue)", returns: "Iterator", desc: "Like zip() but pads shorter iterables with fillvalue instead of stopping.", params: [{ name: "*iterables", type: "Iterable", desc: "Input iterables." }, { name: "fillvalue", type: "object", desc: "Fill value (default None)." }] }],
      "islice":            [{ signature: "islice(iterable, stop)", returns: "Iterator", desc: "Returns selected elements from iterable — like slicing but for any iterator.", params: [{ name: "iterable", type: "Iterable", desc: "Input." }, { name: "stop", type: "int", desc: "Number of elements." }] }],
      "repeat":            [{ signature: "repeat(object, times)", returns: "Iterator", desc: "Yields object repeatedly, times times (or indefinitely if times is None).", params: [{ name: "object", type: "object", desc: "Value to repeat." }, { name: "times", type: "int", desc: "Count (default infinite)." }] }]
    }
  },

  "functools": {
    package: "functools",
    kind: "class",
    description: "Higher-order functions for working with callables.",
    constructors: [],
    methods: {
      "reduce":       [{ signature: "reduce(function, iterable, initializer)", returns: "object", desc: "Applies function cumulatively to items of iterable, reducing to a single value.", params: [{ name: "function", type: "callable", desc: "Binary function." }, { name: "iterable", type: "Iterable", desc: "Input sequence." }, { name: "initializer", type: "object", desc: "Starting value (optional)." }] }],
      "lru_cache":    [{ signature: "lru_cache(maxsize)", returns: "decorator", desc: "Decorator that memoises a function with a least-recently-used cache.", params: [{ name: "maxsize", type: "int", desc: "Cache size (default 128). Use None for unlimited." }] }],
      "cache":        [{ signature: "cache(user_function)", returns: "decorator", desc: "Simpler unbounded memoisation decorator (Python 3.9+). Equivalent to lru_cache(maxsize=None)." }],
      "cmp_to_key":   [{ signature: "cmp_to_key(mycmp)", returns: "callable", desc: "Converts a comparison function (returning -1/0/1) to a key function for use with sorted().", params: [{ name: "mycmp", type: "callable", desc: "Comparison function taking two arguments." }] }],
      "partial":      [{ signature: "partial(func, *args, **kwargs)", returns: "callable", desc: "Returns a new partial object that behaves like func called with *args and **kwargs pre-filled.", params: [{ name: "func", type: "callable", desc: "Function to wrap." }, { name: "*args", type: "object", desc: "Positional arguments to pre-fill." }, { name: "**kwargs", type: "object", desc: "Keyword arguments to pre-fill." }] }]
    }
  }

};
