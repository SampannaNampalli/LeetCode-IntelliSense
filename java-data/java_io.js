/**
 * java_io.js — MAIN world data
 * Defines window.JAVA_IO_DATA with signatures for java.io classes.
 */
window.JAVA_IO_DATA = {

  // ─── BufferedReader ───────────────────────────────────────────────────────
  "BufferedReader": {
    package: "java.io",
    kind: "class",
    description: "Reads text from a character-input stream, buffering characters for efficient reading. Commonly wraps an InputStreamReader(System.in) for competitive programming I/O.",
    constructors: [
      { signature: "BufferedReader(Reader in)", desc: "Creates a buffering character-input stream that uses a default-sized input buffer." },
      { signature: "BufferedReader(Reader in, int sz)", desc: "Creates a buffering character-input stream that uses an input buffer of the specified size." }
    ],
    methods: {
      "readLine": [{ signature: "readLine()", returns: "String", returnsDesc: "A String containing the contents of the line, not including any line-termination characters, or null if the end of the stream has been reached.", params: [], desc: "Reads a line of text. A line is considered to be terminated by a line feed ('\\n'), a carriage return ('\\r'), or a carriage return followed immediately by a linefeed.", throws: ["IOException — if an I/O error occurs"] }],
      "read": [
        { signature: "read()", returns: "int", returnsDesc: "The character read, as an integer in the range 0 to 65535, or -1 if the end of the stream has been reached.", params: [], desc: "Reads a single character.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "read(char[] cbuf, int off, int len)", returns: "int", returnsDesc: "The number of characters read, or -1 if the end of the stream has been reached.", params: [{ name: "cbuf", type: "char[]", desc: "Destination buffer." }, { name: "off", type: "int", desc: "Offset at which to start storing characters." }, { name: "len", type: "int", desc: "Maximum number of characters to read." }], desc: "Reads characters into a portion of an array.", throws: ["IOException — if an I/O error occurs"] }
      ],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes the stream and releases any system resources associated with it.", throws: ["IOException — if an I/O error occurs"] }],
      "mark": [{ signature: "mark(int readAheadLimit)", returns: "void", returnsDesc: "", params: [{ name: "readAheadLimit", type: "int", desc: "Limit on the number of characters that may be read while still preserving the mark." }], desc: "Marks the present position in the stream.", throws: ["IOException — if an I/O error occurs"] }],
      "reset": [{ signature: "reset()", returns: "void", returnsDesc: "", params: [], desc: "Resets the stream to the most recent mark.", throws: ["IOException — if the stream has never been marked, or if the mark has been invalidated"] }],
      "ready": [{ signature: "ready()", returns: "boolean", returnsDesc: "true if the buffer is not empty, or if the underlying character stream is ready.", params: [], desc: "Tells whether this stream is ready to be read.", throws: ["IOException — if an I/O error occurs"] }],
      "skip": [{ signature: "skip(long n)", returns: "long", returnsDesc: "The number of characters actually skipped.", params: [{ name: "n", type: "long", desc: "The number of characters to skip." }], desc: "Skips characters.", throws: ["IOException — if an I/O error occurs"] }],
      "lines": [{ signature: "lines()", returns: "Stream<String>", returnsDesc: "A Stream<String> providing the lines from this BufferedReader.", params: [], desc: "Returns a Stream, the elements of which are lines read from this BufferedReader." }]
    }
  },

  // ─── InputStreamReader ────────────────────────────────────────────────────
  "InputStreamReader": {
    package: "java.io",
    kind: "class",
    description: "A bridge from byte streams to character streams: it reads bytes and decodes them into characters using a specified charset. Most efficient when wrapped in a BufferedReader.",
    constructors: [
      { signature: "InputStreamReader(InputStream in)", desc: "Creates an InputStreamReader that uses the default charset." },
      { signature: "InputStreamReader(InputStream in, String charsetName)", desc: "Creates an InputStreamReader that uses the named charset.", throws: ["UnsupportedEncodingException — if the named charset is not supported"] },
      { signature: "InputStreamReader(InputStream in, Charset cs)", desc: "Creates an InputStreamReader that uses the given charset." }
    ],
    methods: {
      "read": [
        { signature: "read()", returns: "int", returnsDesc: "The character read, or -1 if the end of the stream has been reached.", params: [], desc: "Reads a single character.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "read(char[] cbuf, int offset, int length)", returns: "int", returnsDesc: "The number of characters read, or -1 if end of stream.", params: [{ name: "cbuf", type: "char[]", desc: "The destination buffer." }, { name: "offset", type: "int", desc: "Offset at which to start writing characters." }, { name: "length", type: "int", desc: "Maximum number of characters to read." }], desc: "Reads characters into a portion of an array.", throws: ["IOException — if an I/O error occurs"] }
      ],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes the stream and releases any system resources associated with it.", throws: ["IOException — if an I/O error occurs"] }],
      "getEncoding": [{ signature: "getEncoding()", returns: "String", returnsDesc: "The historical name of this encoding, or null if the stream has been closed.", params: [], desc: "Returns the name of the character encoding being used by this stream." }],
      "ready": [{ signature: "ready()", returns: "boolean", returnsDesc: "true if the InputStreamReader is ready to be read.", params: [], desc: "Tells whether this stream is ready to be read.", throws: ["IOException — if an I/O error occurs"] }]
    }
  },

  // ─── PrintWriter ──────────────────────────────────────────────────────────
  "PrintWriter": {
    package: "java.io",
    kind: "class",
    description: "Prints formatted representations of objects to a text-output stream. Unlike PrintStream, does not throw IOExceptions — errors can be checked via checkError().",
    constructors: [
      { signature: "PrintWriter(Writer out)", desc: "Creates a new PrintWriter, without automatic line flushing." },
      { signature: "PrintWriter(Writer out, boolean autoFlush)", desc: "Creates a new PrintWriter with the auto-flush behavior set." },
      { signature: "PrintWriter(OutputStream out)", desc: "Creates a new PrintWriter, without automatic line flushing, from an existing OutputStream." },
      { signature: "PrintWriter(String fileName)", desc: "Creates a new PrintWriter, without automatic line flushing, with the specified file name.", throws: ["FileNotFoundException — if the given string does not denote an existing, writable file"] }
    ],
    methods: {
      "print": [
        { signature: "print(String s)", returns: "void", returnsDesc: "", params: [{ name: "s", type: "String", desc: "The String value to be printed." }], desc: "Prints a string. If s is null, then 'null' is printed." },
        { signature: "print(int i)", returns: "void", returnsDesc: "", params: [{ name: "i", type: "int", desc: "The int value to be printed." }], desc: "Prints an integer." },
        { signature: "print(boolean b)", returns: "void", returnsDesc: "", params: [{ name: "b", type: "boolean", desc: "The boolean value to be printed." }], desc: "Prints a boolean value." },
        { signature: "print(char c)", returns: "void", returnsDesc: "", params: [{ name: "c", type: "char", desc: "The char value to be printed." }], desc: "Prints a character." },
        { signature: "print(Object obj)", returns: "void", returnsDesc: "", params: [{ name: "obj", type: "Object", desc: "The Object to be printed." }], desc: "Prints an object using toString()." }
      ],
      "println": [
        { signature: "println()", returns: "void", returnsDesc: "", params: [], desc: "Terminates the current line by writing the line separator string." },
        { signature: "println(String x)", returns: "void", returnsDesc: "", params: [{ name: "x", type: "String", desc: "The String value to be printed." }], desc: "Prints a String and then terminates the line." },
        { signature: "println(int x)", returns: "void", returnsDesc: "", params: [{ name: "x", type: "int", desc: "The int value to be printed." }], desc: "Prints an integer and then terminates the line." },
        { signature: "println(Object x)", returns: "void", returnsDesc: "", params: [{ name: "x", type: "Object", desc: "The Object to be printed." }], desc: "Prints an Object and then terminates the line." }
      ],
      "printf": [
        { signature: "printf(String format, Object... args)", returns: "PrintWriter", returnsDesc: "This writer.", params: [{ name: "format", type: "String", desc: "A format string." }, { name: "args", type: "Object...", desc: "Arguments referenced by the format specifiers in the format string." }], desc: "A convenience method to write a formatted string using the specified format string and arguments.", throws: ["IllegalFormatException — if the format string contains illegal syntax"] }
      ],
      "format": [{ signature: "format(String format, Object... args)", returns: "PrintWriter", returnsDesc: "This writer.", params: [{ name: "format", type: "String", desc: "A format string." }, { name: "args", type: "Object...", desc: "Arguments referenced by the format specifiers." }], desc: "Writes a formatted string to this writer using the specified format string and arguments." }],
      "flush": [{ signature: "flush()", returns: "void", returnsDesc: "", params: [], desc: "Flushes the stream." }],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes the stream and releases any system resources associated with it." }],
      "write": [
        { signature: "write(String s)", returns: "void", returnsDesc: "", params: [{ name: "s", type: "String", desc: "String to be written." }], desc: "Writes a string." },
        { signature: "write(char[] buf)", returns: "void", returnsDesc: "", params: [{ name: "buf", type: "char[]", desc: "Array of chars to be written." }], desc: "Writes an array of characters." },
        { signature: "write(int c)", returns: "void", returnsDesc: "", params: [{ name: "c", type: "int", desc: "int specifying a character to be written." }], desc: "Writes a single character." }
      ],
      "append": [
        { signature: "append(CharSequence csq)", returns: "PrintWriter", returnsDesc: "This writer.", params: [{ name: "csq", type: "CharSequence", desc: "The character sequence to append." }], desc: "Appends the specified character sequence to this writer." },
        { signature: "append(char c)", returns: "PrintWriter", returnsDesc: "This writer.", params: [{ name: "c", type: "char", desc: "The 16-bit character to append." }], desc: "Appends the specified character to this writer." }
      ],
      "checkError": [{ signature: "checkError()", returns: "boolean", returnsDesc: "true if and only if this stream has encountered an IOException.", params: [], desc: "Flushes the stream if it's not closed and checks its error state." }]
    }
  },

  // ─── StringReader ─────────────────────────────────────────────────────────
  "StringReader": {
    package: "java.io",
    kind: "class",
    description: "A character stream whose source is a string.",
    constructors: [
      { signature: "StringReader(String s)", desc: "Creates a new string reader." }
    ],
    methods: {
      "read": [
        { signature: "read()", returns: "int", returnsDesc: "The character read, or -1 if end of stream.", params: [], desc: "Reads a single character.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "read(char[] cbuf, int off, int len)", returns: "int", returnsDesc: "The number of characters read, or -1 if end of stream.", params: [{ name: "cbuf", type: "char[]", desc: "Destination buffer." }, { name: "off", type: "int", desc: "Offset at which to start writing characters." }, { name: "len", type: "int", desc: "Maximum number of characters to read." }], desc: "Reads characters into a portion of an array.", throws: ["IOException — if an I/O error occurs"] }
      ],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes the stream and releases any system resources associated with it." }],
      "mark": [{ signature: "mark(int readAheadLimit)", returns: "void", returnsDesc: "", params: [{ name: "readAheadLimit", type: "int", desc: "Limit on the number of characters that may be read while preserving the mark." }], desc: "Marks the present position in the stream. Subsequent calls to reset() will reposition the stream to this point.", throws: ["IOException — if an I/O error occurs"] }],
      "reset": [{ signature: "reset()", returns: "void", returnsDesc: "", params: [], desc: "Resets the stream to the most recent mark, or to the beginning of the string if it has never been marked.", throws: ["IOException — if an I/O error occurs"] }],
      "skip": [{ signature: "skip(long ns)", returns: "long", returnsDesc: "The number of characters actually skipped.", params: [{ name: "ns", type: "long", desc: "The number of characters to skip." }], desc: "Skips the specified number of characters in the stream.", throws: ["IOException — if an I/O error occurs"] }],
      "ready": [{ signature: "ready()", returns: "boolean", returnsDesc: "true, since the source is a String.", params: [], desc: "Tells whether this stream is ready to be read. Always returns true.", throws: ["IOException — if the stream is closed"] }]
    }
  },

  // ─── StringWriter ─────────────────────────────────────────────────────────
  "StringWriter": {
    package: "java.io",
    kind: "class",
    description: "A character stream that collects its output in a string buffer, which can then be used to construct a string. Closing a StringWriter has no effect.",
    constructors: [
      { signature: "StringWriter()", desc: "Create a new string writer using the default initial string-buffer size." },
      { signature: "StringWriter(int initialSize)", desc: "Create a new string writer using the specified initial string-buffer size." }
    ],
    methods: {
      "write": [
        { signature: "write(int c)", returns: "void", returnsDesc: "", params: [{ name: "c", type: "int", desc: "int specifying a character to be written." }], desc: "Write a single character." },
        { signature: "write(String str)", returns: "void", returnsDesc: "", params: [{ name: "str", type: "String", desc: "String to be written." }], desc: "Write a string." },
        { signature: "write(char[] cbuf, int off, int len)", returns: "void", returnsDesc: "", params: [{ name: "cbuf", type: "char[]", desc: "Array of characters." }, { name: "off", type: "int", desc: "Offset from which to start writing characters." }, { name: "len", type: "int", desc: "Number of characters to write." }], desc: "Write a portion of an array of characters." }
      ],
      "toString": [{ signature: "toString()", returns: "String", returnsDesc: "The current value of this writer's string buffer.", params: [], desc: "Return the buffer's current value as a string." }],
      "getBuffer": [{ signature: "getBuffer()", returns: "StringBuffer", returnsDesc: "The string buffer itself.", params: [], desc: "Return the string buffer itself." }],
      "flush": [{ signature: "flush()", returns: "void", returnsDesc: "", params: [], desc: "Flush the stream. (No-op for StringWriter.)" }],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closing a StringWriter has no effect. The methods in this class can be called after the stream has been closed without generating an IOException." }],
      "append": [
        { signature: "append(CharSequence csq)", returns: "StringWriter", returnsDesc: "This writer.", params: [{ name: "csq", type: "CharSequence", desc: "The character sequence to append." }], desc: "Appends the specified character sequence to this writer." },
        { signature: "append(char c)", returns: "StringWriter", returnsDesc: "This writer.", params: [{ name: "c", type: "char", desc: "The 16-bit character to append." }], desc: "Appends the specified character to this writer." }
      ]
    }
  },

  // ─── File ─────────────────────────────────────────────────────────────────
  "File": {
    package: "java.io",
    kind: "class",
    description: "An abstract representation of file and directory pathnames. A File object represents a path in the filesystem. Does not guarantee that a file or directory exists.",
    constructors: [
      { signature: "File(String pathname)", desc: "Creates a new File instance by converting the given pathname string into an abstract pathname." },
      { signature: "File(String parent, String child)", desc: "Creates a new File instance from a parent pathname string and a child pathname string." },
      { signature: "File(File parent, String child)", desc: "Creates a new File instance from a parent abstract pathname and a child pathname string." },
      { signature: "File(URI uri)", desc: "Creates a new File instance by converting the given file: URI into an abstract pathname." }
    ],
    methods: {
      "exists": [{ signature: "exists()", returns: "boolean", returnsDesc: "true if and only if the file or directory denoted by this abstract pathname exists.", params: [], desc: "Tests whether the file or directory denoted by this abstract pathname exists." }],
      "isFile": [{ signature: "isFile()", returns: "boolean", returnsDesc: "true if and only if the file denoted by this abstract pathname exists and is a normal file.", params: [], desc: "Tests whether the file denoted by this abstract pathname is a normal file." }],
      "isDirectory": [{ signature: "isDirectory()", returns: "boolean", returnsDesc: "true if and only if the file denoted by this abstract pathname exists and is a directory.", params: [], desc: "Tests whether the file denoted by this abstract pathname is a directory." }],
      "getName": [{ signature: "getName()", returns: "String", returnsDesc: "The name of the file or directory denoted by this abstract pathname.", params: [], desc: "Returns the name of the file or directory denoted by this abstract pathname." }],
      "getPath": [{ signature: "getPath()", returns: "String", returnsDesc: "The string form of this abstract pathname.", params: [], desc: "Converts this abstract pathname into a pathname string." }],
      "getAbsolutePath": [{ signature: "getAbsolutePath()", returns: "String", returnsDesc: "The absolute pathname string denoting the same file or directory as this abstract pathname.", params: [], desc: "Returns the absolute pathname string of this abstract pathname." }],
      "getParent": [{ signature: "getParent()", returns: "String", returnsDesc: "The pathname string of the parent directory, or null if this pathname does not name a parent.", params: [], desc: "Returns the pathname string of this abstract pathname's parent." }],
      "getParentFile": [{ signature: "getParentFile()", returns: "File", returnsDesc: "The abstract pathname of the parent directory, or null.", params: [], desc: "Returns the abstract pathname of this abstract pathname's parent." }],
      "length": [{ signature: "length()", returns: "long", returnsDesc: "The length, in bytes, of the file denoted by this abstract pathname, or 0L if the file does not exist.", params: [], desc: "Returns the length of the file denoted by this abstract pathname." }],
      "delete": [{ signature: "delete()", returns: "boolean", returnsDesc: "true if and only if the file or directory is successfully deleted.", params: [], desc: "Deletes the file or directory denoted by this abstract pathname. Directories must be empty." }],
      "mkdir": [{ signature: "mkdir()", returns: "boolean", returnsDesc: "true if and only if the directory was created.", params: [], desc: "Creates the directory named by this abstract pathname." }],
      "mkdirs": [{ signature: "mkdirs()", returns: "boolean", returnsDesc: "true if and only if the directory was created, along with all necessary parent directories.", params: [], desc: "Creates the directory named by this abstract pathname, including any necessary but nonexistent parent directories." }],
      "listFiles": [
        { signature: "listFiles()", returns: "File[]", returnsDesc: "An array of abstract pathnames denoting the files in the directory, or null if this abstract pathname does not denote a directory.", params: [], desc: "Returns an array of abstract pathnames denoting the files in the directory denoted by this abstract pathname." },
        { signature: "listFiles(FileFilter filter)", returns: "File[]", returnsDesc: "An array of abstract pathnames accepted by the filter, or null.", params: [{ name: "filter", type: "FileFilter", desc: "A file filter." }], desc: "Returns an array of abstract pathnames denoting the files and directories in the directory that satisfy the filter." }
      ],
      "list": [{ signature: "list()", returns: "String[]", returnsDesc: "An array of strings naming the files and directories in the directory, or null if not a directory.", params: [], desc: "Returns an array of strings naming the files and directories in the directory denoted by this abstract pathname." }],
      "renameTo": [{ signature: "renameTo(File dest)", returns: "boolean", returnsDesc: "true if and only if the renaming succeeded.", params: [{ name: "dest", type: "File", desc: "The new abstract pathname for the named file." }], desc: "Renames the file denoted by this abstract pathname." }],
      "canRead": [{ signature: "canRead()", returns: "boolean", returnsDesc: "true if and only if the file specified by this abstract pathname exists and can be read.", params: [], desc: "Tests whether the application can read the file denoted by this abstract pathname." }],
      "canWrite": [{ signature: "canWrite()", returns: "boolean", returnsDesc: "true if and only if the file system actually contains a file denoted by this abstract pathname and the file allows write access.", params: [], desc: "Tests whether the application can modify the file denoted by this abstract pathname." }],
      "isHidden": [{ signature: "isHidden()", returns: "boolean", returnsDesc: "true if and only if the file denoted by this abstract pathname is hidden.", params: [], desc: "Tests whether the file named by this abstract pathname is a hidden file." }],
      "lastModified": [{ signature: "lastModified()", returns: "long", returnsDesc: "A long value representing the time the file was last modified, or 0L if the file does not exist.", params: [], desc: "Returns the time that the file denoted by this abstract pathname was last modified." }],
      "toPath": [{ signature: "toPath()", returns: "Path", returnsDesc: "A Path constructed from this abstract path.", params: [], desc: "Returns a java.nio.file.Path object constructed from this abstract path." }],
      "createNewFile": [{ signature: "createNewFile()", returns: "boolean", returnsDesc: "true if the file did not exist and was created; false otherwise.", params: [], desc: "Atomically creates a new, empty file named by this abstract pathname if and only if a file with this name does not yet exist.", throws: ["IOException — if an I/O error occurred"] }]
    }
  },

  // ─── IOException ──────────────────────────────────────────────────────────
  "IOException": {
    package: "java.io",
    kind: "class",
    description: "Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.",
    constructors: [
      { signature: "IOException()", desc: "Constructs an IOException with null as its error detail message." },
      { signature: "IOException(String message)", desc: "Constructs an IOException with the specified detail message." },
      { signature: "IOException(String message, Throwable cause)", desc: "Constructs an IOException with the specified detail message and cause." },
      { signature: "IOException(Throwable cause)", desc: "Constructs an IOException with the specified cause and a detail message of (cause==null ? null : cause.toString())." }
    ],
    methods: {
      "getMessage": [{ signature: "getMessage()", returns: "String", returnsDesc: "The detail message string of this Throwable instance.", params: [], desc: "Returns the detail message string of this throwable." }],
      "getCause": [{ signature: "getCause()", returns: "Throwable", returnsDesc: "The cause of this throwable, or null if the cause is nonexistent or unknown.", params: [], desc: "Returns the cause of this throwable or null if the cause is nonexistent or unknown." }],
      "toString": [{ signature: "toString()", returns: "String", returnsDesc: "A string representation of this throwable.", params: [], desc: "Returns a short description of this throwable." }],
      "printStackTrace": [{ signature: "printStackTrace()", returns: "void", returnsDesc: "", params: [], desc: "Prints this throwable and its backtrace to the standard error stream." }]
    }
  },

  // ─── Serializable ─────────────────────────────────────────────────────────
  "Serializable": {
    package: "java.io",
    kind: "interface",
    description: "Serializability of a class is enabled by the class implementing the java.io.Serializable interface. Classes that do not implement this interface will not have any of their state serialized or deserialized. It is a marker interface with no methods.",
    constructors: [],
    methods: {}
  },

  // ─── FileReader ───────────────────────────────────────────────────────────
  "FileReader": {
    package: "java.io",
    kind: "class",
    description: "Reads text from character files using a default buffer size. Decoding from bytes to characters uses either the charset specified in the constructor or the default charset.",
    constructors: [
      { signature: "FileReader(String fileName)", desc: "Creates a new FileReader, given the name of the file to read from.", throws: ["FileNotFoundException — if the named file does not exist, is a directory rather than a regular file, or cannot be opened"] },
      { signature: "FileReader(File file)", desc: "Creates a new FileReader, given the File to read from.", throws: ["FileNotFoundException — if the file does not exist, is a directory, or cannot be opened"] },
      { signature: "FileReader(String fileName, Charset charset)", desc: "Creates a new FileReader, given the name of the file to read from and the charset." }
    ],
    methods: {
      "read": [
        { signature: "read()", returns: "int", returnsDesc: "The character read, or -1 if end of stream.", params: [], desc: "Reads a single character.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "read(char[] cbuf, int offset, int length)", returns: "int", returnsDesc: "The number of characters read, or -1.", params: [{ name: "cbuf", type: "char[]", desc: "Destination buffer." }, { name: "offset", type: "int", desc: "Offset at which to start storing characters." }, { name: "length", type: "int", desc: "Maximum number of characters to read." }], desc: "Reads characters into a portion of an array.", throws: ["IOException — if an I/O error occurs"] }
      ],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes the stream and releases any system resources associated with it.", throws: ["IOException — if an I/O error occurs"] }]
    }
  },

  // ─── FileWriter ───────────────────────────────────────────────────────────
  "FileWriter": {
    package: "java.io",
    kind: "class",
    description: "Writes text to character files using a default buffer size. Encoding from characters to bytes uses either the charset specified in the constructor or the default charset.",
    constructors: [
      { signature: "FileWriter(String fileName)", desc: "Constructs a FileWriter given a file name, using the default charset.", throws: ["IOException — if the named file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason"] },
      { signature: "FileWriter(String fileName, boolean append)", desc: "Constructs a FileWriter given a file name with a boolean indicating whether or not to append the data written.", throws: ["IOException — if the file cannot be opened"] },
      { signature: "FileWriter(File file)", desc: "Constructs a FileWriter given a File object, using the default charset.", throws: ["IOException — if the file cannot be opened"] }
    ],
    methods: {
      "write": [
        { signature: "write(String str)", returns: "void", returnsDesc: "", params: [{ name: "str", type: "String", desc: "String to be written." }], desc: "Writes a string.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "write(int c)", returns: "void", returnsDesc: "", params: [{ name: "c", type: "int", desc: "int specifying a character to be written." }], desc: "Writes a single character.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "write(char[] cbuf)", returns: "void", returnsDesc: "", params: [{ name: "cbuf", type: "char[]", desc: "Array of characters to be written." }], desc: "Writes an array of characters.", throws: ["IOException — if an I/O error occurs"] }
      ],
      "flush": [{ signature: "flush()", returns: "void", returnsDesc: "", params: [], desc: "Flushes the stream.", throws: ["IOException — if an I/O error occurs"] }],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes the stream, flushing it first.", throws: ["IOException — if an I/O error occurs"] }],
      "append": [
        { signature: "append(CharSequence csq)", returns: "FileWriter", returnsDesc: "This writer.", params: [{ name: "csq", type: "CharSequence", desc: "The character sequence to append." }], desc: "Appends the specified character sequence to this writer.", throws: ["IOException — if an I/O error occurs"] },
        { signature: "append(char c)", returns: "FileWriter", returnsDesc: "This writer.", params: [{ name: "c", type: "char", desc: "The 16-bit character to append." }], desc: "Appends the specified character to this writer.", throws: ["IOException — if an I/O error occurs"] }
      ]
    }
  }
};
