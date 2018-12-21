export function stripHTML(text) {
  var pattern = /<\S[^><]*>/g;
  return text.replace(pattern, "");
}

export function trimContentToLength(content, length = 100) {
  const trimmedContent =
    content.length > length
      ? content.substring(0, length - 3) + "..."
      : content;
  return trimmedContent;
}
