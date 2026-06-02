// cpp_algorithms.js — MAIN world, document_idle
// Free functions from <algorithm>, <cmath>, <cstdlib>, <string>
// Stored under pseudo-class keys so the signature-help fallback search finds them.
// Exports: window.CPP_ALGO_DATA

window.CPP_ALGO_DATA = {

  // ── <algorithm> free functions ──────────────────────────────────────────────
  "algorithm": {
    package: "std  (<algorithm>)",
    kind: "class",
    description: "Standard algorithm functions. All operate on iterator ranges. Include <algorithm>.",
    constructors: [],
    methods: {
      "sort": [
        { signature: "sort(RandomIt first, RandomIt last)", returns: "void", desc: "Sorts [first, last) in ascending order. O(n log n).", params: [{ name: "first", type: "RandomIt", desc: "Start of range." }, { name: "last", type: "RandomIt", desc: "End of range (exclusive)." }] },
        { signature: "sort(RandomIt first, RandomIt last, Compare comp)", returns: "void", desc: "Sorts using custom comparator comp.", params: [{ name: "first", type: "RandomIt", desc: "Start." }, { name: "last", type: "RandomIt", desc: "End." }, { name: "comp", type: "Compare", desc: "Comparator, e.g. greater<int>() for descending." }] }
      ],
      "stable_sort": [
        { signature: "stable_sort(RandomIt first, RandomIt last)", returns: "void", desc: "Sorts preserving relative order of equal elements. O(n log² n).", params: [{ name: "first", type: "RandomIt", desc: "Start." }, { name: "last", type: "RandomIt", desc: "End." }] }
      ],
      "reverse": [{ signature: "reverse(BidirIt first, BidirIt last)", returns: "void", desc: "Reverses elements in [first, last) in-place. O(n).", params: [{ name: "first", type: "BidirIt", desc: "Start." }, { name: "last", type: "BidirIt", desc: "End." }] }],
      "find": [{ signature: "find(InputIt first, InputIt last, const T& val)", returns: "InputIt", desc: "Returns iterator to first element equal to val, or last if not found.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "val", type: "const T&", desc: "Value to find." }] }],
      "find_if": [{ signature: "find_if(InputIt first, InputIt last, UnaryPred p)", returns: "InputIt", desc: "Returns iterator to first element for which p returns true.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "p", type: "UnaryPred", desc: "Predicate function." }] }],
      "count": [{ signature: "count(InputIt first, InputIt last, const T& val)", returns: "ptrdiff_t", desc: "Counts elements equal to val in [first, last).", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "count_if": [{ signature: "count_if(InputIt first, InputIt last, UnaryPred p)", returns: "ptrdiff_t", desc: "Counts elements for which p returns true.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "p", type: "UnaryPred", desc: "Predicate." }] }],
      "min": [
        { signature: "min(const T& a, const T& b)", returns: "const T&", desc: "Returns the smaller of a and b.", params: [{ name: "a", type: "const T&", desc: "First value." }, { name: "b", type: "const T&", desc: "Second value." }] },
        { signature: "min(initializer_list<T> ilist)", returns: "T", desc: "Returns the smallest element in the initialiser list.", params: [{ name: "ilist", type: "initializer_list<T>", desc: "List of values, e.g. {1,2,3}." }] }
      ],
      "max": [
        { signature: "max(const T& a, const T& b)", returns: "const T&", desc: "Returns the larger of a and b.", params: [{ name: "a", type: "const T&", desc: "First value." }, { name: "b", type: "const T&", desc: "Second value." }] },
        { signature: "max(initializer_list<T> ilist)", returns: "T", desc: "Returns the largest element in the initialiser list.", params: [{ name: "ilist", type: "initializer_list<T>", desc: "List of values." }] }
      ],
      "min_element": [{ signature: "min_element(ForwardIt first, ForwardIt last)", returns: "ForwardIt", desc: "Returns iterator to the smallest element in [first, last).", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }] }],
      "max_element": [{ signature: "max_element(ForwardIt first, ForwardIt last)", returns: "ForwardIt", desc: "Returns iterator to the largest element in [first, last).", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }] }],
      "lower_bound": [{ signature: "lower_bound(ForwardIt first, ForwardIt last, const T& val)", returns: "ForwardIt", desc: "Iterator to first element >= val in sorted range [first, last).", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "upper_bound": [{ signature: "upper_bound(ForwardIt first, ForwardIt last, const T& val)", returns: "ForwardIt", desc: "Iterator to first element > val in sorted range [first, last).", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "binary_search": [{ signature: "binary_search(ForwardIt first, ForwardIt last, const T& val)", returns: "bool", desc: "Returns true if val exists in sorted range [first, last).", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "accumulate": [{ signature: "accumulate(InputIt first, InputIt last, T init)", returns: "T", desc: "Returns sum of elements in [first, last) starting from init. Requires <numeric>.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "init", type: "T", desc: "Initial value." }] }],
      "fill": [{ signature: "fill(ForwardIt first, ForwardIt last, const T& val)", returns: "void", desc: "Assigns val to every element in [first, last).", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }, { name: "val", type: "const T&", desc: "Fill value." }] }],
      "swap": [{ signature: "swap(T& a, T& b)", returns: "void", desc: "Swaps the values of a and b.", params: [{ name: "a", type: "T&", desc: "First value." }, { name: "b", type: "T&", desc: "Second value." }] }],
      "next_permutation": [{ signature: "next_permutation(BidirIt first, BidirIt last)", returns: "bool", desc: "Rearranges to next lexicographic permutation. Returns false if wrapped to first.", params: [{ name: "first", type: "BidirIt", desc: "Start." }, { name: "last", type: "BidirIt", desc: "End." }] }],
      "prev_permutation": [{ signature: "prev_permutation(BidirIt first, BidirIt last)", returns: "bool", desc: "Rearranges to previous permutation. Returns false if wrapped.", params: [{ name: "first", type: "BidirIt", desc: "Start." }, { name: "last", type: "BidirIt", desc: "End." }] }],
      "unique": [{ signature: "unique(ForwardIt first, ForwardIt last)", returns: "ForwardIt", desc: "Removes consecutive duplicates. Returns iterator to new logical end. Use with erase().", params: [{ name: "first", type: "ForwardIt", desc: "Start." }, { name: "last", type: "ForwardIt", desc: "End." }] }],
      "rotate": [{ signature: "rotate(ForwardIt first, ForwardIt n_first, ForwardIt last)", returns: "ForwardIt", desc: "Rotates so n_first becomes the new first element.", params: [{ name: "first", type: "ForwardIt", desc: "Start of range." }, { name: "n_first", type: "ForwardIt", desc: "New first element." }, { name: "last", type: "ForwardIt", desc: "End." }] }],
      "nth_element": [{ signature: "nth_element(RandomIt first, RandomIt nth, RandomIt last)", returns: "void", desc: "Rearranges so element at nth is what it would be if sorted. Elements before nth are <= nth; after are >=.", params: [{ name: "first", type: "RandomIt", desc: "Start." }, { name: "nth", type: "RandomIt", desc: "Target position." }, { name: "last", type: "RandomIt", desc: "End." }] }],
      "partial_sort": [{ signature: "partial_sort(RandomIt first, RandomIt middle, RandomIt last)", returns: "void", desc: "Sorts [first, middle); remaining elements are in unspecified order.", params: [{ name: "first", type: "RandomIt", desc: "Start." }, { name: "middle", type: "RandomIt", desc: "End of sorted portion." }, { name: "last", type: "RandomIt", desc: "End of range." }] }],
      "copy": [{ signature: "copy(InputIt first, InputIt last, OutputIt d_first)", returns: "OutputIt", desc: "Copies [first, last) to d_first.", params: [{ name: "first", type: "InputIt", desc: "Source start." }, { name: "last", type: "InputIt", desc: "Source end." }, { name: "d_first", type: "OutputIt", desc: "Destination start." }] }],
      "all_of":  [{ signature: "all_of(InputIt first, InputIt last, UnaryPred p)", returns: "bool", desc: "Returns true if p returns true for ALL elements.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "p", type: "UnaryPred", desc: "Predicate." }] }],
      "any_of":  [{ signature: "any_of(InputIt first, InputIt last, UnaryPred p)", returns: "bool", desc: "Returns true if p returns true for ANY element.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "p", type: "UnaryPred", desc: "Predicate." }] }],
      "none_of": [{ signature: "none_of(InputIt first, InputIt last, UnaryPred p)", returns: "bool", desc: "Returns true if p returns true for NO element.", params: [{ name: "first", type: "InputIt", desc: "Start." }, { name: "last", type: "InputIt", desc: "End." }, { name: "p", type: "UnaryPred", desc: "Predicate." }] }]
    }
  },

  // ── <cmath> / <cstdlib> / <string> free functions ───────────────────────────
  "cstdlib": {
    package: "std  (<cmath> / <cstdlib> / <string>)",
    kind: "class",
    description: "Numeric and string conversion free functions.",
    constructors: [],
    methods: {
      "abs":       [{ signature: "abs(int n)", returns: "int", desc: "Absolute value of n.", params: [{ name: "n", type: "int", desc: "Integer value." }] }],
      "fabs":      [{ signature: "fabs(double x)", returns: "double", desc: "Absolute value of floating-point x.", params: [{ name: "x", type: "double", desc: "Value." }] }],
      "sqrt":      [{ signature: "sqrt(double x)", returns: "double", desc: "Square root of x.", params: [{ name: "x", type: "double", desc: "Non-negative value." }] }],
      "pow":       [{ signature: "pow(double base, double exp)", returns: "double", desc: "Returns base raised to the power exp.", params: [{ name: "base", type: "double", desc: "Base." }, { name: "exp", type: "double", desc: "Exponent." }] }],
      "log":       [{ signature: "log(double x)", returns: "double", desc: "Natural logarithm (base e) of x.", params: [{ name: "x", type: "double", desc: "Positive value." }] }],
      "log2":      [{ signature: "log2(double x)", returns: "double", desc: "Base-2 logarithm of x.", params: [{ name: "x", type: "double", desc: "Positive value." }] }],
      "log10":     [{ signature: "log10(double x)", returns: "double", desc: "Base-10 logarithm of x.", params: [{ name: "x", type: "double", desc: "Positive value." }] }],
      "ceil":      [{ signature: "ceil(double x)", returns: "double", desc: "Smallest integer >= x.", params: [{ name: "x", type: "double", desc: "Value." }] }],
      "floor":     [{ signature: "floor(double x)", returns: "double", desc: "Largest integer <= x.", params: [{ name: "x", type: "double", desc: "Value." }] }],
      "round":     [{ signature: "round(double x)", returns: "double", desc: "Nearest integer, rounding halfway cases away from zero.", params: [{ name: "x", type: "double", desc: "Value." }] }],
      "to_string": [
        { signature: "to_string(int val)", returns: "string", desc: "Converts integer to string.", params: [{ name: "val", type: "int", desc: "Integer to convert." }] },
        { signature: "to_string(double val)", returns: "string", desc: "Converts double to string.", params: [{ name: "val", type: "double", desc: "Double to convert." }] }
      ],
      "stoi":  [{ signature: "stoi(const string& str, size_t* pos, int base)", returns: "int", desc: "Converts string to int. Stops at first non-numeric char.", params: [{ name: "str", type: "const string&", desc: "String to parse." }, { name: "pos", type: "size_t*", desc: "Optionally stores index of first unconverted char (default nullptr)." }, { name: "base", type: "int", desc: "Numeric base (default 10)." }] }],
      "stol":  [{ signature: "stol(const string& str, size_t* pos, int base)", returns: "long", desc: "Converts string to long.", params: [{ name: "str", type: "const string&", desc: "String." }, { name: "pos", type: "size_t*", desc: "End position (default nullptr)." }, { name: "base", type: "int", desc: "Base (default 10)." }] }],
      "stoll": [{ signature: "stoll(const string& str, size_t* pos, int base)", returns: "long long", desc: "Converts string to long long.", params: [{ name: "str", type: "const string&", desc: "String." }, { name: "pos", type: "size_t*", desc: "End position." }, { name: "base", type: "int", desc: "Base (default 10)." }] }],
      "stof":  [{ signature: "stof(const string& str, size_t* pos)", returns: "float", desc: "Converts string to float.", params: [{ name: "str", type: "const string&", desc: "String." }, { name: "pos", type: "size_t*", desc: "End position." }] }],
      "stod":  [{ signature: "stod(const string& str, size_t* pos)", returns: "double", desc: "Converts string to double.", params: [{ name: "str", type: "const string&", desc: "String." }, { name: "pos", type: "size_t*", desc: "End position." }] }],
      "gcd":   [{ signature: "gcd(int a, int b)", returns: "int", desc: "Greatest common divisor of a and b. Requires <numeric> (C++17).", params: [{ name: "a", type: "int", desc: "First value." }, { name: "b", type: "int", desc: "Second value." }] }],
      "lcm":   [{ signature: "lcm(int a, int b)", returns: "int", desc: "Least common multiple of a and b. Requires <numeric> (C++17).", params: [{ name: "a", type: "int", desc: "First value." }, { name: "b", type: "int", desc: "Second value." }] }]
    }
  }

};
