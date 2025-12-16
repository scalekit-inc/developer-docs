#!/bin/bash
set -e

# Check if d2 is already installed
if command -v d2 >/dev/null 2>&1; then
  echo "D2 is already installed: $(d2 --version)"
  exit 0
fi

VERSION="${D2_VERSION:-v0.7.1}"
INSTALL_DIR="$HOME/.local/bin"

echo "Installing D2 $VERSION..."

# Download and extract
curl -fsSL "https://github.com/terrastruct/d2/releases/download/$VERSION/d2-$VERSION-linux-amd64.tar.gz" -o /tmp/d2.tar.gz
tar -xz -C /tmp -f /tmp/d2.tar.gz

# Install binary
mkdir -p "$INSTALL_DIR"
if [ -f "/tmp/d2-$VERSION/bin/d2" ]; then
  cp "/tmp/d2-$VERSION/bin/d2" "$INSTALL_DIR/d2"
elif [ -f "/tmp/d2-$VERSION/d2" ]; then
  cp "/tmp/d2-$VERSION/d2" "$INSTALL_DIR/d2"
else
  echo "Error: Could not find d2 binary in release archive"
  exit 1
fi

chmod +x "$INSTALL_DIR/d2"

# Cleanup
rm -rf "/tmp/d2-$VERSION" /tmp/d2.tar.gz

# Add to PATH for current session
export PATH="$INSTALL_DIR:$PATH"

echo "D2 installed successfully: $(d2 --version)"
