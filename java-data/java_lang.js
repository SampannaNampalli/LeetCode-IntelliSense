/**
 * java_lang.js — MAIN world data
 * Defines window.JAVA_LANG_DATA with signatures for java.lang classes.
 */
window.JAVA_LANG_DATA = {

  // ─── String ──────────────────────────────────────────────────────────────
  "String": {
    package: "java.lang",
    kind: "class",
    description: "Represents an immutable sequence of characters. All string literals in Java programs are instances of this class.",
    constructors: [
      { signature: "String()", desc: "Initializes a newly created String object to represent an empty character sequence." },
      { signature: "String(String original)", desc: "Initializes a new String that is a copy of the argument." },
      { signature: "String(char[] value)", desc: "Allocates a new String from the character array." },
      { signature: "String(byte[] bytes, Charset charset)", desc: "Constructs a new String by decoding the byte array with the specified charset." }
    ],
    fields: {
      "CASE_INSENSITIVE_ORDER": { type: "Comparator<String>", desc: "A Comparator that orders String objects lexicographically, ignoring case." }
    },
    methods: {
      "charAt": [{ signature: "charAt(int index)", returns: "char", returnsDesc: "The char value at the specified index.", params: [{ name: "index", type: "int", desc: "The index of the char value." }], desc: "Returns the char value at the specified index.", throws: ["IndexOutOfBoundsException — if index is negative or not less than length()"] }],
      "length": [{ signature: "length()", returns: "int", returnsDesc: "The length of this string.", params: [], desc: "Returns the length of this string." }],
      "substring": [
        { signature: "substring(int beginIndex)", returns: "String", returnsDesc: "The specified substring.", params: [{ name: "beginIndex", type: "int", desc: "The beginning index, inclusive." }], desc: "Returns a substring starting at beginIndex.", throws: ["IndexOutOfBoundsException — if beginIndex is negative or larger than length()"] },
        { signature: "substring(int beginIndex, int endIndex)", returns: "String", returnsDesc: "The specified substring.", params: [{ name: "beginIndex", type: "int", desc: "The beginning index, inclusive." }, { name: "endIndex", type: "int", desc: "The ending index, exclusive." }], desc: "Returns a substring from beginIndex to endIndex (exclusive).", throws: ["IndexOutOfBoundsException — if indices are out of range"] }
      ],
      "indexOf": [
        { signature: "indexOf(int ch)", returns: "int", returnsDesc: "Index of the first occurrence, or -1.", params: [{ name: "ch", type: "int", desc: "A character (Unicode code point)." }], desc: "Returns the index of the first occurrence of the specified character." },
        { signature: "indexOf(int ch, int fromIndex)", returns: "int", returnsDesc: "Index of the first occurrence at or after fromIndex, or -1.", params: [{ name: "ch", type: "int", desc: "A character (Unicode code point)." }, { name: "fromIndex", type: "int", desc: "The index to start the search." }], desc: "Returns the index of the first occurrence of the character, starting at fromIndex." },
        { signature: "indexOf(String str)", returns: "int", returnsDesc: "Index of the first occurrence, or -1.", params: [{ name: "str", type: "String", desc: "The substring to search for." }], desc: "Returns the index of the first occurrence of the specified substring." },
        { signature: "indexOf(String str, int fromIndex)", returns: "int", returnsDesc: "Index of the first occurrence at or after fromIndex, or -1.", params: [{ name: "str", type: "String", desc: "The substring to search for." }, { name: "fromIndex", type: "int", desc: "The index to start the search." }], desc: "Returns the index of the first occurrence of the substring, starting at fromIndex." }
      ],
      "lastIndexOf": [
        { signature: "lastIndexOf(int ch)", returns: "int", returnsDesc: "Index of the last occurrence, or -1.", params: [{ name: "ch", type: "int", desc: "A character (Unicode code point)." }], desc: "Returns the index of the last occurrence of the specified character." },
        { signature: "lastIndexOf(String str)", returns: "int", returnsDesc: "Index of the last occurrence, or -1.", params: [{ name: "str", type: "String", desc: "The substring to search for." }], desc: "Returns the index of the last occurrence of the specified substring." }
      ],
      "contains": [{ signature: "contains(CharSequence s)", returns: "boolean", returnsDesc: "true if this string contains the specified sequence.", params: [{ name: "s", type: "CharSequence", desc: "The sequence to search for." }], desc: "Returns true if and only if this string contains the specified sequence of char values." }],
      "startsWith": [
        { signature: "startsWith(String prefix)", returns: "boolean", returnsDesc: "true if the string starts with the specified prefix.", params: [{ name: "prefix", type: "String", desc: "The prefix." }], desc: "Tests if this string starts with the specified prefix." },
        { signature: "startsWith(String prefix, int toffset)", returns: "boolean", returnsDesc: "true if the string starts with the prefix at toffset.", params: [{ name: "prefix", type: "String", desc: "The prefix." }, { name: "toffset", type: "int", desc: "Where to begin looking in this string." }], desc: "Tests if the substring starting at toffset starts with the specified prefix." }
      ],
      "endsWith": [{ signature: "endsWith(String suffix)", returns: "boolean", returnsDesc: "true if the string ends with the specified suffix.", params: [{ name: "suffix", type: "String", desc: "The suffix." }], desc: "Tests if this string ends with the specified suffix." }],
      "equals": [{ signature: "equals(Object anObject)", returns: "boolean", returnsDesc: "true if the objects are equal.", params: [{ name: "anObject", type: "Object", desc: "The object to compare." }], desc: "Compares this string to the specified object." }],
      "equalsIgnoreCase": [{ signature: "equalsIgnoreCase(String anotherString)", returns: "boolean", returnsDesc: "true if the strings are equal ignoring case.", params: [{ name: "anotherString", type: "String", desc: "The string to compare." }], desc: "Compares this String to another String, ignoring case considerations." }],
      "compareTo": [{ signature: "compareTo(String anotherString)", returns: "int", returnsDesc: "Negative if less, zero if equal, positive if greater.", params: [{ name: "anotherString", type: "String", desc: "The String to be compared." }], desc: "Compares two strings lexicographically." }],
      "compareToIgnoreCase": [{ signature: "compareToIgnoreCase(String str)", returns: "int", returnsDesc: "Negative if less, zero if equal, positive if greater.", params: [{ name: "str", type: "String", desc: "The String to be compared." }], desc: "Compares two strings lexicographically, ignoring case." }],
      "split": [
        { signature: "split(String regex)", returns: "String[]", returnsDesc: "Array of strings split around matches of the given expression.", params: [{ name: "regex", type: "String", desc: "The delimiting regular expression." }], desc: "Splits this string around matches of the given regular expression.", throws: ["PatternSyntaxException — if the regular expression's syntax is invalid"] },
        { signature: "split(String regex, int limit)", returns: "String[]", returnsDesc: "Array of strings split around matches, at most limit long.", params: [{ name: "regex", type: "String", desc: "The delimiting regular expression." }, { name: "limit", type: "int", desc: "Controls the number of times the pattern is applied." }], desc: "Splits this string around matches of the given regular expression, with a limit." }
      ],
      "trim": [{ signature: "trim()", returns: "String", returnsDesc: "A string whose value is this string, with leading and trailing white space removed.", params: [], desc: "Returns a copy of the string with leading and trailing whitespace removed." }],
      "strip": [{ signature: "strip()", returns: "String", returnsDesc: "The string stripped of leading and trailing whitespace.", params: [], desc: "Returns a string whose value is this string, with all leading and trailing white space removed (Unicode-aware)." }],
      "replace": [
        { signature: "replace(char oldChar, char newChar)", returns: "String", returnsDesc: "A string derived from replacing every occurrence of oldChar with newChar.", params: [{ name: "oldChar", type: "char", desc: "The old character." }, { name: "newChar", type: "char", desc: "The new character." }], desc: "Returns a new string resulting from replacing all occurrences of oldChar with newChar." },
        { signature: "replace(CharSequence target, CharSequence replacement)", returns: "String", returnsDesc: "The resulting string.", params: [{ name: "target", type: "CharSequence", desc: "The sequence of char values to be replaced." }, { name: "replacement", type: "CharSequence", desc: "The replacement sequence of char values." }], desc: "Replaces each substring of this string that matches the literal target sequence." }
      ],
      "replaceAll": [{ signature: "replaceAll(String regex, String replacement)", returns: "String", returnsDesc: "The resulting String.", params: [{ name: "regex", type: "String", desc: "The regular expression to which this string is to be matched." }, { name: "replacement", type: "String", desc: "The string to be substituted for each match." }], desc: "Replaces each substring that matches the given regular expression with the given replacement.", throws: ["PatternSyntaxException — if the regex has invalid syntax"] }],
      "replaceFirst": [{ signature: "replaceFirst(String regex, String replacement)", returns: "String", returnsDesc: "The resulting String.", params: [{ name: "regex", type: "String", desc: "The regular expression to match." }, { name: "replacement", type: "String", desc: "The string to be substituted for the first match." }], desc: "Replaces the first substring that matches the regular expression." }],
      "toCharArray": [{ signature: "toCharArray()", returns: "char[]", returnsDesc: "A newly allocated character array.", params: [], desc: "Converts this string to a new character array." }],
      "toLowerCase": [
        { signature: "toLowerCase()", returns: "String", returnsDesc: "The string, converted to lowercase.", params: [], desc: "Converts all characters in this String to lowercase using default locale rules." },
        { signature: "toLowerCase(Locale locale)", returns: "String", returnsDesc: "The string, converted to lowercase using the locale.", params: [{ name: "locale", type: "Locale", desc: "Use the case transformation rules for this locale." }], desc: "Converts all characters in this String to lowercase using the given Locale's rules." }
      ],
      "toUpperCase": [
        { signature: "toUpperCase()", returns: "String", returnsDesc: "The string, converted to uppercase.", params: [], desc: "Converts all characters in this String to uppercase using default locale rules." },
        { signature: "toUpperCase(Locale locale)", returns: "String", returnsDesc: "The string, converted to uppercase using the locale.", params: [{ name: "locale", type: "Locale", desc: "Use the case transformation rules for this locale." }], desc: "Converts all characters in this String to uppercase using the given Locale's rules." }
      ],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if length() is 0.", params: [], desc: "Returns true if, and only if, length() is 0." }],
      "isBlank": [{ signature: "isBlank()", returns: "boolean", returnsDesc: "true if the string is empty or contains only white space codepoints.", params: [], desc: "Returns true if the string is empty or contains only white space codepoints." }],
      "intern": [{ signature: "intern()", returns: "String", returnsDesc: "A string that has the same contents as this string, from the pool.", params: [], desc: "Returns a canonical representation for the string object from the string pool." }],
      "matches": [{ signature: "matches(String regex)", returns: "boolean", returnsDesc: "true if, and only if, this string matches the given regular expression.", params: [{ name: "regex", type: "String", desc: "The regular expression to which this string is to be matched." }], desc: "Tells whether or not this string matches the given regular expression.", throws: ["PatternSyntaxException — if the regular expression's syntax is invalid"] }],
      "format": [
        { signature: "format(String format, Object... args)", returns: "String", returnsDesc: "A formatted string.", params: [{ name: "format", type: "String", desc: "A format string." }, { name: "args", type: "Object...", desc: "Arguments referenced by the format specifiers." }], desc: "Returns a formatted string using the specified format string and arguments.", throws: ["IllegalFormatException — if a format specifier is illegal"] }
      ],
      "valueOf": [
        { signature: "valueOf(boolean b)", returns: "String", returnsDesc: "The string representation of the boolean.", params: [{ name: "b", type: "boolean", desc: "A boolean." }], desc: "Returns the string representation of the boolean argument." },
        { signature: "valueOf(char c)", returns: "String", returnsDesc: "The string representation of the char.", params: [{ name: "c", type: "char", desc: "A char." }], desc: "Returns the string representation of the char argument." },
        { signature: "valueOf(int i)", returns: "String", returnsDesc: "The string representation of the int.", params: [{ name: "i", type: "int", desc: "An int." }], desc: "Returns the string representation of the int argument." },
        { signature: "valueOf(long l)", returns: "String", returnsDesc: "The string representation of the long.", params: [{ name: "l", type: "long", desc: "A long." }], desc: "Returns the string representation of the long argument." },
        { signature: "valueOf(Object obj)", returns: "String", returnsDesc: "The string representation of the object.", params: [{ name: "obj", type: "Object", desc: "An Object." }], desc: "Returns the string representation of the Object argument." }
      ],
      "join": [
        { signature: "join(CharSequence delimiter, CharSequence... elements)", returns: "String", returnsDesc: "A new String that is composed of the elements separated by the delimiter.", params: [{ name: "delimiter", type: "CharSequence", desc: "The delimiter that separates each element." }, { name: "elements", type: "CharSequence...", desc: "The elements to join together." }], desc: "Returns a new String composed of copies of the CharSequence elements joined together with the delimiter." },
        { signature: "join(CharSequence delimiter, Iterable<? extends CharSequence> elements)", returns: "String", returnsDesc: "A new String composed of the elements separated by the delimiter.", params: [{ name: "delimiter", type: "CharSequence", desc: "The delimiter that separates each element." }, { name: "elements", type: "Iterable<? extends CharSequence>", desc: "An Iterable that will have its elements joined together." }], desc: "Returns a new String composed of copies of the elements joined together with the delimiter." }
      ],
      "chars": [{ signature: "chars()", returns: "IntStream", returnsDesc: "An IntStream of char values from this sequence.", params: [], desc: "Returns a stream of int values from this sequence, zero-extending each char to an int." }],
      "toCharArray": [{ signature: "toCharArray()", returns: "char[]", returnsDesc: "A newly allocated character array.", params: [], desc: "Converts this string to a new character array." }]
    }
  },

  // ─── StringBuilder ────────────────────────────────────────────────────────
  "StringBuilder": {
    package: "java.lang",
    kind: "class",
    description: "A mutable sequence of characters. Drop-in replacement for StringBuffer with no synchronization (not thread-safe, but faster).",
    constructors: [
      { signature: "StringBuilder()", desc: "Constructs a string builder with no characters and initial capacity of 16." },
      { signature: "StringBuilder(int capacity)", desc: "Constructs a string builder with no characters and the specified initial capacity." },
      { signature: "StringBuilder(String str)", desc: "Constructs a string builder initialized to the contents of the specified string." },
      { signature: "StringBuilder(CharSequence seq)", desc: "Constructs a string builder that contains the same characters as the specified CharSequence." }
    ],
    methods: {
      "append": [
        { signature: "append(String str)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "str", type: "String", desc: "The string to append." }], desc: "Appends the string to this character sequence." },
        { signature: "append(char c)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "c", type: "char", desc: "The char to append." }], desc: "Appends the char to this character sequence." },
        { signature: "append(int i)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "i", type: "int", desc: "The int to append." }], desc: "Appends the string representation of the int to this sequence." },
        { signature: "append(long l)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "l", type: "long", desc: "The long to append." }], desc: "Appends the string representation of the long to this sequence." },
        { signature: "append(boolean b)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "b", type: "boolean", desc: "The boolean to append." }], desc: "Appends the string representation of the boolean to this sequence." },
        { signature: "append(char[] str)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "str", type: "char[]", desc: "The characters to append." }], desc: "Appends the string representation of the char array." },
        { signature: "append(Object obj)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "obj", type: "Object", desc: "The object to append (uses toString())." }], desc: "Appends the string representation of the Object argument." }
      ],
      "insert": [
        { signature: "insert(int offset, String str)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "offset", type: "int", desc: "The offset." }, { name: "str", type: "String", desc: "The string to insert." }], desc: "Inserts the string into this character sequence.", throws: ["StringIndexOutOfBoundsException — if offset is invalid"] },
        { signature: "insert(int offset, char c)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "offset", type: "int", desc: "The offset." }, { name: "c", type: "char", desc: "The char to insert." }], desc: "Inserts the char into this sequence." },
        { signature: "insert(int offset, int i)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "offset", type: "int", desc: "The offset." }, { name: "i", type: "int", desc: "The int to insert." }], desc: "Inserts the string representation of the int into this sequence." }
      ],
      "delete": [{ signature: "delete(int start, int end)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "start", type: "int", desc: "The beginning index, inclusive." }, { name: "end", type: "int", desc: "The ending index, exclusive." }], desc: "Removes the characters in a substring of this sequence.", throws: ["StringIndexOutOfBoundsException — if start is negative, greater than length(), or greater than end"] }],
      "deleteCharAt": [{ signature: "deleteCharAt(int index)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "index", type: "int", desc: "Index of char to remove." }], desc: "Removes the char at the specified position in this sequence.", throws: ["StringIndexOutOfBoundsException — if index is negative or >= length()"] }],
      "replace": [{ signature: "replace(int start, int end, String str)", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [{ name: "start", type: "int", desc: "The beginning index, inclusive." }, { name: "end", type: "int", desc: "The ending index, exclusive." }, { name: "str", type: "String", desc: "String that will replace previous contents." }], desc: "Replaces the characters in a substring with characters in the specified String.", throws: ["StringIndexOutOfBoundsException — if start is negative or greater than length()"] }],
      "reverse": [{ signature: "reverse()", returns: "StringBuilder", returnsDesc: "A reference to this object.", params: [], desc: "Causes this character sequence to be replaced by the reverse of the sequence." }],
      "length": [{ signature: "length()", returns: "int", returnsDesc: "The length of this sequence of characters.", params: [], desc: "Returns the length (character count) of this sequence." }],
      "charAt": [{ signature: "charAt(int index)", returns: "char", returnsDesc: "The char value in this sequence at the specified index.", params: [{ name: "index", type: "int", desc: "The index of the desired char value." }], desc: "Returns the char value at the specified index.", throws: ["IndexOutOfBoundsException — if index is negative or >= length()"] }],
      "setCharAt": [{ signature: "setCharAt(int index, char ch)", returns: "void", returnsDesc: "", params: [{ name: "index", type: "int", desc: "The index of the character to modify." }, { name: "ch", type: "char", desc: "The new character." }], desc: "The character at the specified index is set to ch.", throws: ["IndexOutOfBoundsException — if index is negative or >= length()"] }],
      "indexOf": [
        { signature: "indexOf(String str)", returns: "int", returnsDesc: "The index of the first occurrence, or -1.", params: [{ name: "str", type: "String", desc: "The substring to search for." }], desc: "Returns the index of the first occurrence of the specified substring." },
        { signature: "indexOf(String str, int fromIndex)", returns: "int", returnsDesc: "The index of the first occurrence starting at fromIndex, or -1.", params: [{ name: "str", type: "String", desc: "The substring to search for." }, { name: "fromIndex", type: "int", desc: "The index from which to start the search." }], desc: "Returns the index of the first occurrence of the substring, starting at fromIndex." }
      ],
      "substring": [
        { signature: "substring(int start)", returns: "String", returnsDesc: "The specified substring.", params: [{ name: "start", type: "int", desc: "The beginning index, inclusive." }], desc: "Returns a new String that contains a subsequence of characters from start to end." },
        { signature: "substring(int start, int end)", returns: "String", returnsDesc: "The specified substring.", params: [{ name: "start", type: "int", desc: "The beginning index, inclusive." }, { name: "end", type: "int", desc: "The ending index, exclusive." }], desc: "Returns a new String that contains a subsequence of characters from start to end (exclusive)." }
      ],
      "toString": [{ signature: "toString()", returns: "String", returnsDesc: "A string representation of this sequence.", params: [], desc: "Returns a string representing the data in this sequence." }],
      "capacity": [{ signature: "capacity()", returns: "int", returnsDesc: "The current capacity.", params: [], desc: "Returns the current capacity of this builder." }],
      "ensureCapacity": [{ signature: "ensureCapacity(int minimumCapacity)", returns: "void", returnsDesc: "", params: [{ name: "minimumCapacity", type: "int", desc: "The minimum desired capacity." }], desc: "Ensures that the capacity is at least equal to the specified minimum." }]
    }
  },

  // ─── Integer ──────────────────────────────────────────────────────────────
  "Integer": {
    package: "java.lang",
    kind: "class",
    description: "The Integer class wraps a value of the primitive type int in an object. Also provides useful static methods for working with ints.",
    constructors: [
      { signature: "Integer(int value)", desc: "Deprecated. Constructs a newly allocated Integer object that represents the specified int value." },
      { signature: "Integer(String s)", desc: "Deprecated. Constructs a newly allocated Integer object that represents the int value indicated by the String parameter." }
    ],
    fields: {
      "MAX_VALUE": { type: "int", desc: "A constant holding the maximum value an int can have: 2^31 - 1 = 2147483647." },
      "MIN_VALUE": { type: "int", desc: "A constant holding the minimum value an int can have: -2^31 = -2147483648." },
      "SIZE": { type: "int", desc: "The number of bits used to represent an int value in two's complement binary form (32)." },
      "BYTES": { type: "int", desc: "The number of bytes used to represent an int value (4)." }
    },
    methods: {
      "parseInt": [
        { signature: "parseInt(String s)", returns: "int", returnsDesc: "The integer value represented by the argument.", params: [{ name: "s", type: "String", desc: "A String containing the int representation to be parsed." }], desc: "Parses the string argument as a signed decimal integer.", throws: ["NumberFormatException — if the string does not contain a parsable integer"] },
        { signature: "parseInt(String s, int radix)", returns: "int", returnsDesc: "The integer value represented by the string in the specified radix.", params: [{ name: "s", type: "String", desc: "A String containing the int representation to be parsed." }, { name: "radix", type: "int", desc: "The radix to be used while parsing s." }], desc: "Parses the string argument as a signed integer in the specified radix.", throws: ["NumberFormatException — if the string does not contain a parsable integer"] }
      ],
      "valueOf": [
        { signature: "valueOf(int i)", returns: "Integer", returnsDesc: "An Integer instance representing i.", params: [{ name: "i", type: "int", desc: "An int value." }], desc: "Returns an Integer instance representing the specified int value." },
        { signature: "valueOf(String s)", returns: "Integer", returnsDesc: "An Integer object holding the value represented by the string.", params: [{ name: "s", type: "String", desc: "The string to be parsed." }], desc: "Returns an Integer object holding the value of the specified String.", throws: ["NumberFormatException — if the string cannot be parsed"] }
      ],
      "toString": [
        { signature: "toString()", returns: "String", returnsDesc: "A string representation of the value of this object in base 10.", params: [], desc: "Returns a String object representing this Integer's value." },
        { signature: "toString(int i)", returns: "String", returnsDesc: "A string representation of the argument in base 10.", params: [{ name: "i", type: "int", desc: "An integer to be converted." }], desc: "Returns a String object representing the specified integer." },
        { signature: "toString(int i, int radix)", returns: "String", returnsDesc: "A string representation of the argument in the specified radix.", params: [{ name: "i", type: "int", desc: "An integer to be converted." }, { name: "radix", type: "int", desc: "The radix to use in the string representation." }], desc: "Returns a string representation of the first argument in the radix specified." }
      ],
      "compare": [{ signature: "compare(int x, int y)", returns: "int", returnsDesc: "Negative if x < y, zero if x == y, positive if x > y.", params: [{ name: "x", type: "int", desc: "The first int to compare." }, { name: "y", type: "int", desc: "The second int to compare." }], desc: "Compares two int values numerically." }],
      "max": [{ signature: "max(int a, int b)", returns: "int", returnsDesc: "The greater of a and b.", params: [{ name: "a", type: "int", desc: "The first operand." }, { name: "b", type: "int", desc: "The second operand." }], desc: "Returns the greater of two int values (same as Math.max)." }],
      "min": [{ signature: "min(int a, int b)", returns: "int", returnsDesc: "The smaller of a and b.", params: [{ name: "a", type: "int", desc: "The first operand." }, { name: "b", type: "int", desc: "The second operand." }], desc: "Returns the smaller of two int values (same as Math.min)." }],
      "sum": [{ signature: "sum(int a, int b)", returns: "int", returnsDesc: "The sum of a and b.", params: [{ name: "a", type: "int", desc: "The first operand." }, { name: "b", type: "int", desc: "The second operand." }], desc: "Adds two integers together as per the + operator." }],
      "toBinaryString": [{ signature: "toBinaryString(int i)", returns: "String", returnsDesc: "The string representation of the unsigned integer value in binary (base 2).", params: [{ name: "i", type: "int", desc: "An integer to be converted to a string." }], desc: "Returns a string representation of the integer argument as an unsigned integer in base 2." }],
      "toHexString": [{ signature: "toHexString(int i)", returns: "String", returnsDesc: "The string representation in hexadecimal (base 16).", params: [{ name: "i", type: "int", desc: "An integer to be converted to a string." }], desc: "Returns a string representation of the integer argument as an unsigned integer in base 16." }],
      "toOctalString": [{ signature: "toOctalString(int i)", returns: "String", returnsDesc: "The string representation in octal (base 8).", params: [{ name: "i", type: "int", desc: "An integer to be converted to a string." }], desc: "Returns a string representation of the integer argument as an unsigned integer in base 8." }],
      "bitCount": [{ signature: "bitCount(int i)", returns: "int", returnsDesc: "The number of one-bits in the two's complement binary representation.", params: [{ name: "i", type: "int", desc: "The value whose bits are to be counted." }], desc: "Returns the number of one-bits in the two's complement representation of the specified int value (population count)." }],
      "highestOneBit": [{ signature: "highestOneBit(int i)", returns: "int", returnsDesc: "An int value with a single one-bit in the position of the highest-order one-bit of i.", params: [{ name: "i", type: "int", desc: "The value whose highest one bit is to be computed." }], desc: "Returns an int value with at most a single one-bit, in the position of the highest-order one-bit of the specified int value." }],
      "lowestOneBit": [{ signature: "lowestOneBit(int i)", returns: "int", returnsDesc: "An int value with a single one-bit, in the position of the lowest-order one-bit of i.", params: [{ name: "i", type: "int", desc: "The value whose lowest one bit is to be computed." }], desc: "Returns an int value with at most a single one-bit, in the position of the lowest-order one-bit of the specified int value." }],
      "numberOfLeadingZeros": [{ signature: "numberOfLeadingZeros(int i)", returns: "int", returnsDesc: "The number of zero bits preceding the highest-order one-bit.", params: [{ name: "i", type: "int", desc: "The value whose number of leading zeros is to be computed." }], desc: "Returns the number of zero bits preceding the highest-order one-bit in the two's complement binary representation." }],
      "numberOfTrailingZeros": [{ signature: "numberOfTrailingZeros(int i)", returns: "int", returnsDesc: "The number of zero bits following the lowest-order one-bit.", params: [{ name: "i", type: "int", desc: "The value whose number of trailing zeros is to be computed." }], desc: "Returns the number of zero bits following the lowest-order one-bit in the two's complement binary representation." }],
      "reverse": [{ signature: "reverse(int i)", returns: "int", returnsDesc: "The value obtained by reversing the bits.", params: [{ name: "i", type: "int", desc: "The value to be reversed." }], desc: "Returns the value obtained by reversing the order of the bits in the two's complement binary representation." }],
      "reverseBytes": [{ signature: "reverseBytes(int i)", returns: "int", returnsDesc: "The value obtained by reversing the bytes.", params: [{ name: "i", type: "int", desc: "The value whose bytes are to be reversed." }], desc: "Returns the value obtained by reversing the order of the bytes in the two's complement representation." }],
      "intValue": [{ signature: "intValue()", returns: "int", returnsDesc: "The numeric value represented by this object after conversion to type int.", params: [], desc: "Returns the value of this Integer as an int." }],
      "longValue": [{ signature: "longValue()", returns: "long", returnsDesc: "The numeric value represented by this object after conversion to type long.", params: [], desc: "Returns the value of this Integer as a long." }]
    }
  },

  // ─── Long ─────────────────────────────────────────────────────────────────
  "Long": {
    package: "java.lang",
    kind: "class",
    description: "The Long class wraps a value of the primitive type long in an object.",
    constructors: [
      { signature: "Long(long value)", desc: "Deprecated. Constructs a newly allocated Long object for the specified long value." }
    ],
    fields: {
      "MAX_VALUE": { type: "long", desc: "A constant holding the maximum value a long can have: 2^63 - 1 = 9223372036854775807." },
      "MIN_VALUE": { type: "long", desc: "A constant holding the minimum value a long can have: -2^63 = -9223372036854775808." }
    },
    methods: {
      "parseLong": [
        { signature: "parseLong(String s)", returns: "long", returnsDesc: "The long value represented by the string.", params: [{ name: "s", type: "String", desc: "A String containing the long representation to be parsed." }], desc: "Parses the string argument as a signed decimal long.", throws: ["NumberFormatException — if the string does not contain a parsable long"] },
        { signature: "parseLong(String s, int radix)", returns: "long", returnsDesc: "The long value represented by the string in the specified radix.", params: [{ name: "s", type: "String", desc: "A String containing the long representation to be parsed." }, { name: "radix", type: "int", desc: "The radix to be used while parsing." }], desc: "Parses the string argument as a signed long in the specified radix." }
      ],
      "valueOf": [
        { signature: "valueOf(long l)", returns: "Long", returnsDesc: "A Long instance representing l.", params: [{ name: "l", type: "long", desc: "A long value." }], desc: "Returns a Long instance representing the specified long value." },
        { signature: "valueOf(String s)", returns: "Long", returnsDesc: "A Long object holding the value represented by the string.", params: [{ name: "s", type: "String", desc: "The string to be parsed." }], desc: "Returns a Long object holding the value of the specified String." }
      ],
      "toString": [
        { signature: "toString()", returns: "String", returnsDesc: "A string representation of this Long's value in base 10.", params: [], desc: "Returns a String object representing this Long's value." },
        { signature: "toString(long i)", returns: "String", returnsDesc: "A string representation of the argument in base 10.", params: [{ name: "i", type: "long", desc: "A long to be converted to a string." }], desc: "Returns a String object representing the specified long." }
      ],
      "compare": [{ signature: "compare(long x, long y)", returns: "int", returnsDesc: "Negative if x < y, zero if x == y, positive if x > y.", params: [{ name: "x", type: "long", desc: "The first long to compare." }, { name: "y", type: "long", desc: "The second long to compare." }], desc: "Compares two long values numerically." }],
      "toBinaryString": [{ signature: "toBinaryString(long i)", returns: "String", returnsDesc: "The string representation in binary (base 2).", params: [{ name: "i", type: "long", desc: "A long to be converted to a string." }], desc: "Returns a string representation of the long argument as an unsigned integer in base 2." }],
      "bitCount": [{ signature: "bitCount(long i)", returns: "int", returnsDesc: "The number of one-bits.", params: [{ name: "i", type: "long", desc: "The value whose bits are to be counted." }], desc: "Returns the number of one-bits in the two's complement representation of the specified long value." }],
      "longValue": [{ signature: "longValue()", returns: "long", returnsDesc: "The numeric value represented by this object as a long.", params: [], desc: "Returns the value of this Long as a long." }],
      "intValue": [{ signature: "intValue()", returns: "int", returnsDesc: "The value of this Long after conversion to int (may truncate).", params: [], desc: "Returns the value of this Long as an int." }]
    }
  },

  // ─── Double ───────────────────────────────────────────────────────────────
  "Double": {
    package: "java.lang",
    kind: "class",
    description: "The Double class wraps a value of the primitive type double in an object.",
    constructors: [
      { signature: "Double(double value)", desc: "Deprecated. Constructs a newly allocated Double object for the specified double value." }
    ],
    fields: {
      "MAX_VALUE": { type: "double", desc: "A constant holding the largest positive finite value of type double: (2-2^-52)·2^1023." },
      "MIN_VALUE": { type: "double", desc: "A constant holding the smallest positive nonzero value of type double: 2^-1074." },
      "POSITIVE_INFINITY": { type: "double", desc: "A constant holding the positive infinity of type double." },
      "NEGATIVE_INFINITY": { type: "double", desc: "A constant holding the negative infinity of type double." },
      "NaN": { type: "double", desc: "A constant holding a Not-a-Number (NaN) value of type double." }
    },
    methods: {
      "parseDouble": [{ signature: "parseDouble(String s)", returns: "double", returnsDesc: "The double value represented by the string.", params: [{ name: "s", type: "String", desc: "The string to be parsed." }], desc: "Returns a new double initialized to the value represented by the specified String.", throws: ["NumberFormatException — if the string does not contain a parsable double"] }],
      "valueOf": [
        { signature: "valueOf(double d)", returns: "Double", returnsDesc: "A Double instance representing d.", params: [{ name: "d", type: "double", desc: "A double value." }], desc: "Returns a Double instance representing the specified double value." },
        { signature: "valueOf(String s)", returns: "Double", returnsDesc: "A Double object holding the value represented by the string.", params: [{ name: "s", type: "String", desc: "The string to be parsed." }], desc: "Returns a Double object holding the double value represented by the string.", throws: ["NumberFormatException — if the string is not parsable"] }
      ],
      "toString": [
        { signature: "toString()", returns: "String", returnsDesc: "A string representation of this Double's value.", params: [], desc: "Returns a string representation of this Double object." },
        { signature: "toString(double d)", returns: "String", returnsDesc: "A string representation of the argument.", params: [{ name: "d", type: "double", desc: "The double to be converted." }], desc: "Returns a string representation of the double argument." }
      ],
      "isNaN": [
        { signature: "isNaN()", returns: "boolean", returnsDesc: "true if the value represented by this object is NaN.", params: [], desc: "Returns true if this Double value is a Not-a-Number (NaN)." },
        { signature: "isNaN(double v)", returns: "boolean", returnsDesc: "true if the argument is NaN.", params: [{ name: "v", type: "double", desc: "The value to be tested." }], desc: "Returns true if the specified number is a Not-a-Number (NaN) value." }
      ],
      "isInfinite": [
        { signature: "isInfinite()", returns: "boolean", returnsDesc: "true if the value represented by this object is positive or negative infinity.", params: [], desc: "Returns true if this Double value is infinitely large in magnitude." },
        { signature: "isInfinite(double v)", returns: "boolean", returnsDesc: "true if the argument is infinite.", params: [{ name: "v", type: "double", desc: "The value to be tested." }], desc: "Returns true if the specified number is infinitely large in magnitude." }
      ],
      "compare": [{ signature: "compare(double d1, double d2)", returns: "int", returnsDesc: "Negative if d1 < d2, zero if equal, positive if d1 > d2.", params: [{ name: "d1", type: "double", desc: "The first double to compare." }, { name: "d2", type: "double", desc: "The second double to compare." }], desc: "Compares two double values numerically." }],
      "doubleValue": [{ signature: "doubleValue()", returns: "double", returnsDesc: "The double value represented by this object.", params: [], desc: "Returns the value of this Double as a double." }],
      "intValue": [{ signature: "intValue()", returns: "int", returnsDesc: "The double value converted to int.", params: [], desc: "Returns the value of this Double as an int (by casting to type int)." }]
    }
  },

  // ─── Character ────────────────────────────────────────────────────────────
  "Character": {
    package: "java.lang",
    kind: "class",
    description: "The Character class wraps a value of the primitive type char in an object. Provides static utility methods for character operations.",
    constructors: [
      { signature: "Character(char value)", desc: "Deprecated. Constructs a newly allocated Character object that represents the specified char value." }
    ],
    fields: {
      "MAX_VALUE": { type: "char", desc: "The constant value of this field is the largest value of type char: '\\uFFFF'." },
      "MIN_VALUE": { type: "char", desc: "The constant value of this field is the smallest value of type char: '\\u0000'." }
    },
    methods: {
      "isDigit": [{ signature: "isDigit(char ch)", returns: "boolean", returnsDesc: "true if ch is a digit.", params: [{ name: "ch", type: "char", desc: "The character to be tested." }], desc: "Determines if the specified character is a digit." }],
      "isLetter": [{ signature: "isLetter(char ch)", returns: "boolean", returnsDesc: "true if ch is a letter.", params: [{ name: "ch", type: "char", desc: "The character to be tested." }], desc: "Determines if the specified character is a letter." }],
      "isLetterOrDigit": [{ signature: "isLetterOrDigit(char ch)", returns: "boolean", returnsDesc: "true if ch is a letter or digit.", params: [{ name: "ch", type: "char", desc: "The character to be tested." }], desc: "Determines if the specified character is a letter or digit." }],
      "isWhitespace": [{ signature: "isWhitespace(char ch)", returns: "boolean", returnsDesc: "true if ch is whitespace.", params: [{ name: "ch", type: "char", desc: "The character to be tested." }], desc: "Determines if the specified character is Java whitespace." }],
      "isUpperCase": [{ signature: "isUpperCase(char ch)", returns: "boolean", returnsDesc: "true if ch is uppercase.", params: [{ name: "ch", type: "char", desc: "The character to be tested." }], desc: "Determines if the specified character is an uppercase character." }],
      "isLowerCase": [{ signature: "isLowerCase(char ch)", returns: "boolean", returnsDesc: "true if ch is lowercase.", params: [{ name: "ch", type: "char", desc: "The character to be tested." }], desc: "Determines if the specified character is a lowercase character." }],
      "isAlphabetic": [{ signature: "isAlphabetic(int codePoint)", returns: "boolean", returnsDesc: "true if the code point is an alphabetic character.", params: [{ name: "codePoint", type: "int", desc: "The Unicode code point to be tested." }], desc: "Determines if the specified character (Unicode code point) is alphabetic." }],
      "toUpperCase": [{ signature: "toUpperCase(char ch)", returns: "char", returnsDesc: "The uppercase equivalent of ch, or ch itself if none.", params: [{ name: "ch", type: "char", desc: "The character to be converted." }], desc: "Converts the character argument to uppercase." }],
      "toLowerCase": [{ signature: "toLowerCase(char ch)", returns: "char", returnsDesc: "The lowercase equivalent of ch, or ch itself if none.", params: [{ name: "ch", type: "char", desc: "The character to be converted." }], desc: "Converts the character argument to lowercase." }],
      "getNumericValue": [{ signature: "getNumericValue(char ch)", returns: "int", returnsDesc: "The numeric value of ch, or -1 if it has no numeric value.", params: [{ name: "ch", type: "char", desc: "The character to be converted." }], desc: "Returns the int value that the specified Unicode character represents." }],
      "valueOf": [{ signature: "valueOf(char c)", returns: "Character", returnsDesc: "A Character instance representing c.", params: [{ name: "c", type: "char", desc: "A char value." }], desc: "Returns a Character instance representing the specified char value." }],
      "compare": [{ signature: "compare(char x, char y)", returns: "int", returnsDesc: "Negative if x < y, zero if equal, positive if x > y.", params: [{ name: "x", type: "char", desc: "The first char to compare." }, { name: "y", type: "char", desc: "The second char to compare." }], desc: "Compares two char values numerically." }],
      "charValue": [{ signature: "charValue()", returns: "char", returnsDesc: "The primitive char value represented by this object.", params: [], desc: "Returns the value of this Character object." }],
      "toString": [{ signature: "toString(char c)", returns: "String", returnsDesc: "A String of length 1 containing the character c.", params: [{ name: "c", type: "char", desc: "The char to convert." }], desc: "Returns a String object representing the specified char." }]
    }
  },

  // ─── Boolean ──────────────────────────────────────────────────────────────
  "Boolean": {
    package: "java.lang",
    kind: "class",
    description: "The Boolean class wraps a value of the primitive type boolean in an object.",
    constructors: [
      { signature: "Boolean(boolean value)", desc: "Deprecated. Allocates a Boolean object representing the value argument." },
      { signature: "Boolean(String s)", desc: "Deprecated. Allocates a Boolean object representing the value true if the string is not null and equal to the string \"true\" (ignoring case)." }
    ],
    fields: {
      "TRUE": { type: "Boolean", desc: "The Boolean object corresponding to the primitive value true." },
      "FALSE": { type: "Boolean", desc: "The Boolean object corresponding to the primitive value false." }
    },
    methods: {
      "parseBoolean": [{ signature: "parseBoolean(String s)", returns: "boolean", returnsDesc: "true if the string is non-null and equal to \"true\" (case-insensitive).", params: [{ name: "s", type: "String", desc: "The String containing the boolean representation to be parsed." }], desc: "Parses the string argument as a boolean." }],
      "valueOf": [
        { signature: "valueOf(boolean b)", returns: "Boolean", returnsDesc: "Boolean.TRUE if b is true, Boolean.FALSE if b is false.", params: [{ name: "b", type: "boolean", desc: "A boolean value." }], desc: "Returns a Boolean instance representing the specified boolean value." },
        { signature: "valueOf(String s)", returns: "Boolean", returnsDesc: "Boolean.TRUE if the string is \"true\" (ignoring case), otherwise Boolean.FALSE.", params: [{ name: "s", type: "String", desc: "A string." }], desc: "Returns a Boolean with a value represented by the specified string." }
      ],
      "toString": [{ signature: "toString()", returns: "String", returnsDesc: "\"true\" or \"false\".", params: [], desc: "Returns a String object representing this Boolean's value." }],
      "booleanValue": [{ signature: "booleanValue()", returns: "boolean", returnsDesc: "The primitive boolean value of this object.", params: [], desc: "Returns the value of this Boolean object as a boolean primitive." }],
      "compare": [{ signature: "compare(boolean x, boolean y)", returns: "int", returnsDesc: "0 if x == y, positive if x is true and y is false, negative if x is false and y is true.", params: [{ name: "x", type: "boolean", desc: "The first boolean to compare." }, { name: "y", type: "boolean", desc: "The second boolean to compare." }], desc: "Compares two boolean values." }]
    }
  },

  // ─── Math ─────────────────────────────────────────────────────────────────
  "Math": {
    package: "java.lang",
    kind: "class",
    description: "The class Math contains methods for performing basic numeric operations such as elementary exponential, logarithm, square root, and trigonometric functions. All methods are static.",
    constructors: [],
    fields: {
      "PI": { type: "double", desc: "The double value that is closer than any other to π (pi): 3.141592653589793." },
      "E": { type: "double", desc: "The double value that is closer than any other to e (the base of the natural logarithms): 2.718281828459045." }
    },
    methods: {
      "abs": [
        { signature: "abs(int a)", returns: "int", returnsDesc: "The absolute value of a.", params: [{ name: "a", type: "int", desc: "The argument whose absolute value is to be determined." }], desc: "Returns the absolute value of an int value." },
        { signature: "abs(long a)", returns: "long", returnsDesc: "The absolute value of a.", params: [{ name: "a", type: "long", desc: "The argument whose absolute value is to be determined." }], desc: "Returns the absolute value of a long value." },
        { signature: "abs(double a)", returns: "double", returnsDesc: "The absolute value of a.", params: [{ name: "a", type: "double", desc: "The argument whose absolute value is to be determined." }], desc: "Returns the absolute value of a double value." }
      ],
      "max": [
        { signature: "max(int a, int b)", returns: "int", returnsDesc: "The larger of a and b.", params: [{ name: "a", type: "int", desc: "An argument." }, { name: "b", type: "int", desc: "Another argument." }], desc: "Returns the greater of two int values." },
        { signature: "max(long a, long b)", returns: "long", returnsDesc: "The larger of a and b.", params: [{ name: "a", type: "long", desc: "An argument." }, { name: "b", type: "long", desc: "Another argument." }], desc: "Returns the greater of two long values." },
        { signature: "max(double a, double b)", returns: "double", returnsDesc: "The larger of a and b.", params: [{ name: "a", type: "double", desc: "An argument." }, { name: "b", type: "double", desc: "Another argument." }], desc: "Returns the greater of two double values." }
      ],
      "min": [
        { signature: "min(int a, int b)", returns: "int", returnsDesc: "The smaller of a and b.", params: [{ name: "a", type: "int", desc: "An argument." }, { name: "b", type: "int", desc: "Another argument." }], desc: "Returns the smaller of two int values." },
        { signature: "min(long a, long b)", returns: "long", returnsDesc: "The smaller of a and b.", params: [{ name: "a", type: "long", desc: "An argument." }, { name: "b", type: "long", desc: "Another argument." }], desc: "Returns the smaller of two long values." },
        { signature: "min(double a, double b)", returns: "double", returnsDesc: "The smaller of a and b.", params: [{ name: "a", type: "double", desc: "An argument." }, { name: "b", type: "double", desc: "Another argument." }], desc: "Returns the smaller of two double values." }
      ],
      "pow": [{ signature: "pow(double a, double b)", returns: "double", returnsDesc: "The value a^b.", params: [{ name: "a", type: "double", desc: "The base." }, { name: "b", type: "double", desc: "The exponent." }], desc: "Returns the value of the first argument raised to the power of the second argument." }],
      "sqrt": [{ signature: "sqrt(double a)", returns: "double", returnsDesc: "The positive square root of a.", params: [{ name: "a", type: "double", desc: "A value." }], desc: "Returns the correctly rounded positive square root of a double value." }],
      "cbrt": [{ signature: "cbrt(double a)", returns: "double", returnsDesc: "The cube root of a.", params: [{ name: "a", type: "double", desc: "A value." }], desc: "Returns the cube root of a double value." }],
      "floor": [{ signature: "floor(double a)", returns: "double", returnsDesc: "The largest floating-point value that is less than or equal to a and is equal to a mathematical integer.", params: [{ name: "a", type: "double", desc: "A double value." }], desc: "Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is equal to a mathematical integer." }],
      "ceil": [{ signature: "ceil(double a)", returns: "double", returnsDesc: "The smallest (closest to negative infinity) double value that is >= a.", params: [{ name: "a", type: "double", desc: "A double value." }], desc: "Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is equal to a mathematical integer." }],
      "round": [
        { signature: "round(double a)", returns: "long", returnsDesc: "The value of the argument rounded to the nearest long.", params: [{ name: "a", type: "double", desc: "A floating-point value to be rounded to a long." }], desc: "Returns the closest long to the argument, with ties rounding to positive infinity." },
        { signature: "round(float a)", returns: "int", returnsDesc: "The value of the argument rounded to the nearest int.", params: [{ name: "a", type: "float", desc: "A floating-point value to be rounded to an integer." }], desc: "Returns the closest int to the argument, with ties rounding to positive infinity." }
      ],
      "log": [{ signature: "log(double a)", returns: "double", returnsDesc: "The natural logarithm (base e) of a.", params: [{ name: "a", type: "double", desc: "A value." }], desc: "Returns the natural logarithm (base e) of a double value." }],
      "log10": [{ signature: "log10(double a)", returns: "double", returnsDesc: "The base 10 logarithm of a.", params: [{ name: "a", type: "double", desc: "A value." }], desc: "Returns the base 10 logarithm of a double value." }],
      "log1p": [{ signature: "log1p(double x)", returns: "double", returnsDesc: "The natural logarithm of (x + 1).", params: [{ name: "x", type: "double", desc: "A value." }], desc: "Returns the natural logarithm of the sum of the argument and 1." }],
      "exp": [{ signature: "exp(double a)", returns: "double", returnsDesc: "The value e^a.", params: [{ name: "a", type: "double", desc: "The exponent to raise e to." }], desc: "Returns Euler's number e raised to the power of a double value." }],
      "sin": [{ signature: "sin(double a)", returns: "double", returnsDesc: "The sine of a.", params: [{ name: "a", type: "double", desc: "An angle, in radians." }], desc: "Returns the trigonometric sine of an angle." }],
      "cos": [{ signature: "cos(double a)", returns: "double", returnsDesc: "The cosine of a.", params: [{ name: "a", type: "double", desc: "An angle, in radians." }], desc: "Returns the trigonometric cosine of an angle." }],
      "tan": [{ signature: "tan(double a)", returns: "double", returnsDesc: "The tangent of a.", params: [{ name: "a", type: "double", desc: "An angle, in radians." }], desc: "Returns the trigonometric tangent of an angle." }],
      "atan": [{ signature: "atan(double a)", returns: "double", returnsDesc: "The arc tangent of a; returned angle in the range -π/2 to π/2.", params: [{ name: "a", type: "double", desc: "The value whose arc tangent is to be returned." }], desc: "Returns the arc tangent of a value." }],
      "atan2": [{ signature: "atan2(double y, double x)", returns: "double", returnsDesc: "The theta component of the point (r, theta) in polar coordinates corresponding to the point (x, y).", params: [{ name: "y", type: "double", desc: "The ordinate coordinate." }, { name: "x", type: "double", desc: "The abscissa coordinate." }], desc: "Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta)." }],
      "random": [{ signature: "random()", returns: "double", returnsDesc: "A pseudorandom double value in [0.0, 1.0).", params: [], desc: "Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0." }],
      "signum": [
        { signature: "signum(double d)", returns: "double", returnsDesc: "The signum of d: -1.0 if negative, 0.0 if zero, 1.0 if positive.", params: [{ name: "d", type: "double", desc: "The floating-point value whose signum is to be returned." }], desc: "Returns the signum function of the argument." }
      ],
      "floorDiv": [{ signature: "floorDiv(int x, int y)", returns: "int", returnsDesc: "The largest int value that is less than or equal to the algebraic quotient.", params: [{ name: "x", type: "int", desc: "The dividend." }, { name: "y", type: "int", desc: "The divisor." }], desc: "Returns the largest (closest to positive infinity) int value that is less than or equal to the algebraic quotient.", throws: ["ArithmeticException — if y is zero"] }],
      "floorMod": [{ signature: "floorMod(int x, int y)", returns: "int", returnsDesc: "The floor modulus x - (floorDiv(x, y) * y).", params: [{ name: "x", type: "int", desc: "The dividend." }, { name: "y", type: "int", desc: "The divisor." }], desc: "Returns the floor modulus of the int arguments.", throws: ["ArithmeticException — if y is zero"] }]
    }
  },

  // ─── Object ───────────────────────────────────────────────────────────────
  "Object": {
    package: "java.lang",
    kind: "class",
    description: "The root class of the Java class hierarchy. Every class has Object as a superclass. All objects implement the methods of this class.",
    constructors: [
      { signature: "Object()", desc: "Constructs a new Object." }
    ],
    methods: {
      "equals": [{ signature: "equals(Object obj)", returns: "boolean", returnsDesc: "true if this object is the same as the obj argument; false otherwise.", params: [{ name: "obj", type: "Object", desc: "The reference object with which to compare." }], desc: "Indicates whether some other object is 'equal to' this one." }],
      "hashCode": [{ signature: "hashCode()", returns: "int", returnsDesc: "A hash code value for this object.", params: [], desc: "Returns a hash code value for the object." }],
      "toString": [{ signature: "toString()", returns: "String", returnsDesc: "A string representation of the object.", params: [], desc: "Returns a string representation of the object. The default implementation returns className@hexHashCode." }],
      "getClass": [{ signature: "getClass()", returns: "Class<?>", returnsDesc: "The Class object that represents the runtime class of this object.", params: [], desc: "Returns the runtime class of this Object." }],
      "clone": [{ signature: "clone()", returns: "Object", returnsDesc: "A clone of this instance.", params: [], desc: "Creates and returns a copy of this object.", throws: ["CloneNotSupportedException — if the object's class does not implement Cloneable"] }],
      "notify": [{ signature: "notify()", returns: "void", returnsDesc: "", params: [], desc: "Wakes up a single thread that is waiting on this object's monitor.", throws: ["IllegalMonitorStateException — if the current thread is not the owner of this object's monitor"] }],
      "notifyAll": [{ signature: "notifyAll()", returns: "void", returnsDesc: "", params: [], desc: "Wakes up all threads that are waiting on this object's monitor.", throws: ["IllegalMonitorStateException — if the current thread is not the owner of this object's monitor"] }],
      "wait": [
        { signature: "wait()", returns: "void", returnsDesc: "", params: [], desc: "Causes the current thread to wait until another thread invokes notify() or notifyAll() on this object.", throws: ["InterruptedException — if any thread interrupted the current thread before or while the current thread was waiting"] },
        { signature: "wait(long timeoutMillis)", returns: "void", returnsDesc: "", params: [{ name: "timeoutMillis", type: "long", desc: "The maximum time to wait in milliseconds." }], desc: "Causes the current thread to wait until notified or the specified timeout elapses.", throws: ["InterruptedException — if interrupted while waiting", "IllegalArgumentException — if timeoutMillis is negative"] }
      ]
    }
  },

  // ─── System ───────────────────────────────────────────────────────────────
  "System": {
    package: "java.lang",
    kind: "class",
    description: "The System class provides access to system resources. It contains useful class fields and methods (all static). Notably, System.out (PrintStream) and System.err for output.",
    constructors: [],
    fields: {
      "out": { type: "PrintStream", desc: "The 'standard' output stream (System.out.println(...) etc.)." },
      "err": { type: "PrintStream", desc: "The 'standard' error output stream." },
      "in": { type: "InputStream", desc: "The 'standard' input stream." }
    },
    methods: {
      "currentTimeMillis": [{ signature: "currentTimeMillis()", returns: "long", returnsDesc: "The current time, measured in milliseconds since the epoch (January 1, 1970 UTC).", params: [], desc: "Returns the current time in milliseconds." }],
      "nanoTime": [{ signature: "nanoTime()", returns: "long", returnsDesc: "The current value of the running JVM's high-resolution time source, in nanoseconds.", params: [], desc: "Returns the current value of the JVM's high-resolution time source, in nanoseconds." }],
      "arraycopy": [{ signature: "arraycopy(Object src, int srcPos, Object dest, int destPos, int length)", returns: "void", returnsDesc: "", params: [{ name: "src", type: "Object", desc: "The source array." }, { name: "srcPos", type: "int", desc: "Starting position in the source array." }, { name: "dest", type: "Object", desc: "The destination array." }, { name: "destPos", type: "int", desc: "Starting position in the destination data." }, { name: "length", type: "int", desc: "The number of array elements to be copied." }], desc: "Copies an array from the specified source array to the specified position of the destination array.", throws: ["IndexOutOfBoundsException — if copying would cause access of data outside array bounds", "ArrayStoreException — if an element cannot be stored due to type mismatch", "NullPointerException — if either src or dest is null"] }],
      "exit": [{ signature: "exit(int status)", returns: "void", returnsDesc: "", params: [{ name: "status", type: "int", desc: "Exit status. By convention, 0 indicates normal termination." }], desc: "Terminates the currently running Java Virtual Machine." }],
      "gc": [{ signature: "gc()", returns: "void", returnsDesc: "", params: [], desc: "Runs the garbage collector. Calling this suggests to the JVM that it would be a good time to recycle unused objects." }],
      "getenv": [{ signature: "getenv(String name)", returns: "String", returnsDesc: "The string value of the variable, or null if the variable is not defined.", params: [{ name: "name", type: "String", desc: "The name of the environment variable." }], desc: "Gets the value of the specified environment variable.", throws: ["NullPointerException — if name is null"] }]
    }
  }
};
