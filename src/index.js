module.exports = function check(str, bracketsConfig) {
  const stack = [];
    const openingBrackets = [];
    const closingBrackets = [];
    const matchingBrackets = {};

    // Extract opening and closing brackets from bracketsConfig
    for (const [opening, closing] of bracketsConfig) {
      openingBrackets.push(opening);
      closingBrackets.push(closing);
      matchingBrackets[closing] = opening;
    }

    for (const char of str) {
      // Check if the character is an opening bracket
      if (openingBrackets.includes(char)) {
        // Special case: opening and closing bracket are the same
        if (char === matchingBrackets[char] && stack[stack.length - 1] === char) {
          stack.pop(); // Remove the matching opening bracket from the stack
        } else {
          stack.push(char); // Push the opening bracket onto the stack
        }
      } else if (closingBrackets.includes(char)) {
        // Check if the character is a closing bracket
        const openingBracket = matchingBrackets[char];

        // If the stack is empty or the last opening bracket on the stack doesn't match the current closing bracket, return false
        if (!stack.length || stack.pop() !== openingBracket) {
          return false;
        }
      }
    }

    // If there are still opening brackets on the stack, return false
    return stack.length === 0;
}
