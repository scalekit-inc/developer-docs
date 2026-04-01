#!/bin/bash
set -e

# Check if d2 is already installed
if command -v d2 >/dev/null 2>&1; then
  echo "D2 is already installed: $(d2 --version)"
  exit 0
fi

VERSION="${D2_VERSION:-v0.7.1}"
INSTALL_DIR="$HOME/.local/bin"

# Detect OS and architecture
OS="$(uname -s)"
ARCH="$(uname -m)"

# Map architecture names
case "$ARCH" in
  x86_64|amd64)
    ARCH="amd64"
    ;;
  aarch64|arm64)
    ARCH="arm64"
    ;;
  *)
    echo "Error: Unsupported architecture: $ARCH"
    echo "Supported architectures: x86_64/amd64, aarch64/arm64"
    exit 1
    ;;
esac

# Map OS names
case "$OS" in
  Darwin)
    OS="darwin"
    ;;
  Linux)
    OS="linux"
    ;;
  *)
    echo "Error: Unsupported operating system: $OS"
    echo "Supported operating systems: macOS (Darwin), Linux"
    exit 1
    ;;
esac

echo "Installing D2 $VERSION for $OS $ARCH..."

# Download the correct artifact
TAR_FILE="d2-$VERSION-$OS-$ARCH.tar.gz"
DOWNLOAD_URL="https://github.com/terrastruct/d2/releases/download/$VERSION/$TAR_FILE"

echo "Downloading from $DOWNLOAD_URL..."
if ! curl -fsSL "$DOWNLOAD_URL" -o /tmp/d2.tar.gz; then
  echo "Error: Failed to download D2"
  echo "Please verify the version and try again, or install manually from:"
  echo "https://github.com/terrastruct/d2/releases"
  exit 1
fi

# Extract
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

# Verify installation
if [ ! -x "$INSTALL_DIR/d2" ]; then
  echo "Error: Installation failed - d2 binary not executable"
  exit 1
fi

# Check if INSTALL_DIR is in PATH
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
  echo ""
  echo "⚠️  WARNING: $INSTALL_DIR is not in your PATH"
  echo ""
  echo "Add this to your shell configuration file (~/.zshrc, ~/.bashrc, ~/.profile):"
  echo ""
  echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
  echo ""
  echo "Then reload your shell configuration:"
  echo ""
  echo "  source ~/.zshrc   # or ~/.bashrc"
  echo ""
fi

# Use the newly installed binary
export PATH="$INSTALL_DIR:$PATH"

echo "D2 installed successfully: $(d2 --version)"
